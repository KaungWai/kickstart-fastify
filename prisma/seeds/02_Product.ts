import { Prisma, PrismaClient } from '@prisma/client'

import productData from './data/product.json'

export const seedProduct = async (prisma: PrismaClient) => {
    const dataList: Prisma.ProductCreateInput[] = []

    await prisma.product.createMany({
        data: productData,
    })

    return `Product: ${dataList.length}row(s) inserted.`
}
