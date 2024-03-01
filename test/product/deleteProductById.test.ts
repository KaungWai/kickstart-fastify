import 'module-alias/register'

import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'
import { test } from 'tap'

import build from '@/app'
import { SYS_CONSTANTS } from '@/constants/systemConstants'

import { getJWtToken } from '../helper'

test('deleteProductById: delete a product as a read-only user', async (t) => {
    const prisma = new PrismaClient()

    // prepare data
    const data = {
        productId: nanoid(SYS_CONSTANTS.NANOID_LENGTH),
        productName: 'product',
        productDescription: 'description',
        productPrice: 100,
    }

    // create a product
    await prisma.product.create({
        data,
    })

    // login as read-only user
    const readOnlyJWT = await getJWtToken('USER00000001', 'password')
    t.ok(readOnlyJWT)

    // delete the product
    const server = build({})
    const response = await server.inject({
        method: 'DELETE',
        url: `/product/${data.productId}`,
        cookies: {
            jwt: readOnlyJWT,
        },
    })
    server.close()

    t.ok(response)
    t.equal(response.statusCode, 403)
    t.equal(response.json().message, 'Not enough permission.')

    const product = await prisma.product.findFirst({
        where: {
            productId: data.productId,
        },
    })
    prisma.$disconnect()

    t.ok(product)

    t.end()
})

test('deleteProductById: delete a unknown product as a read-write user', async (t) => {
    // login as read-write user
    const readWirteJWT = await getJWtToken('USER00000002', 'password')

    t.ok(readWirteJWT)

    const server = build({})
    const productId = nanoid(SYS_CONSTANTS.NANOID_LENGTH)
    const response = await server.inject({
        method: 'DELETE',
        url: `/product/${productId}`,
        cookies: {
            jwt: readWirteJWT,
        },
    })
    server.close()

    t.ok(response)
    t.equal(response.statusCode, 404)
    t.equal(response.json().message, 'Product not found.')

    t.end()
})

test('deleteProductById: delete a product as a read-write user', async (t) => {
    const prisma = new PrismaClient()

    // prepare data
    const data = {
        productId: nanoid(SYS_CONSTANTS.NANOID_LENGTH),
        productName: 'product',
        productDescription: 'description',
        productPrice: 100,
    }

    // create a product
    await prisma.product.create({
        data,
    })

    // login as read-write user
    const readWirteJWT = await getJWtToken('USER00000002', 'password')
    t.ok(readWirteJWT)

    const server = build({})
    const response = await server.inject({
        method: 'DELETE',
        url: `/product/${data.productId}`,
        cookies: {
            jwt: readWirteJWT,
        },
    })
    server.close()

    t.ok(response)
    t.equal(response.statusCode, 204)

    const product = await prisma.product.findFirst({
        where: {
            productId: data.productId,
        },
    })
    prisma.$disconnect()

    t.notOk(product)

    t.end()
})
