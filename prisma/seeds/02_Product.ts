import { faker } from '@faker-js/faker'
import { Prisma, PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'

export const seedProduct = async (prisma: PrismaClient) => {
    const dataList: Prisma.ProductCreateInput[] = []

    for (let i = 0; i < 20; i++) {
        dataList.push({
            productId: nanoid(12),
            productName: faker.commerce.product(),
            productDescription: faker.commerce.productDescription(),
            productPrice: Number(faker.commerce.price(1, 10000, 0)),
        })
    }

    await prisma.product.createMany({
        data: dataList,
    })

    return `Product: ${dataList.length}row(s) inserted.`
}
