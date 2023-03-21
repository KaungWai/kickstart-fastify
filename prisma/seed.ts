import { PrismaClient } from '@prisma/client'

import { seedUser } from './seeds/01_User'
import { seedProduct } from './seeds/02_Product'

const prisma = new PrismaClient()

const seedAll = async () => {
    console.log(`[${new Date().toLocaleDateString()}] Seeding started.`)

    await seedUser(prisma).then((message) => {
        console.log(`[${new Date().toLocaleDateString()}] ${message}`)
    })

    await seedProduct(prisma).then((message) => {
        console.log(`[${new Date().toLocaleDateString()}] ${message}`)
    })
}

seedAll()
    .then(() => {
        console.log(`[${new Date().toLocaleDateString()}] Seeding finished.`)
    })
    .catch((e) => {
        console.log(e)
    })
    .finally(() => {
        prisma.$disconnect()
    })
