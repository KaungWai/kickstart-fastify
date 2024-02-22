import { PrismaClient } from '@prisma/client'

import productData from './data/product.json'

export const seedProduct = async (prisma: PrismaClient) => {

    await prisma.product.createMany({
        data: productData,
    })

    return `Product: ${productData.length}row(s) inserted.`
}
