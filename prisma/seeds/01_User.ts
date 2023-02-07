import { faker } from '@faker-js/faker'
import { genSaltSync, hashSync } from 'bcrypt'
import { Permission, Prisma, PrismaClient } from '@prisma/client'
import { SYS_CONSTANTS } from '@/constants/systemConstants'

export const seedUser = async (prisma: PrismaClient) => {
    const users = [
        {
            id: 'AAABBBCCC001',
            permission: Permission.READ_ONLY,
        },
        {
            id: 'AAABBBCCC002',
            permission: Permission.READ_ONLY,
        },
        {
            id: 'AAABBBCCC003',
            permission: Permission.READ_WRITE,
        },
        {
            id: 'AAABBBCCC004',
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
