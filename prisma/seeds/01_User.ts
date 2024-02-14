import { faker } from '@faker-js/faker'
import { Permission, Prisma, PrismaClient } from '@prisma/client'
import { genSaltSync, hashSync } from 'bcrypt'

import { SYS_CONSTANTS } from '../../src/constants/systemConstants'

export const seedUser = async (prisma: PrismaClient) => {
    const users = [
        {
            id: 'USER00000001',
            permission: Permission.READ_ONLY,
        },
        {
            id: 'USER00000002',
            permission: Permission.READ_WRITE,
        },
    ]

    const dataList: Prisma.UserCreateInput[] = []

    for (let i = 0; i < users.length; i++) {
        const userSearch = await prisma.user.findUnique({
            where: {
                userId: users[i].id,
            },
        })

        if (userSearch) {
            // already seeded. skip.
            continue
        }

        const salt = genSaltSync(SYS_CONSTANTS.SALT_ROUNDS)
        const password = 'password'
        const hash = hashSync(password, salt)

        dataList.push({
            userId: users[i].id,
            userName: faker.name.fullName(),
            salt: salt,
            hash: hash,
            permission: users[i].permission,
        })
    }

    await prisma.user.createMany({
        data: dataList,
    })

    return `User: ${dataList.length}row(s) inserted.`
}
