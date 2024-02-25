import 'module-alias/register'

import { PrismaClient } from '@prisma/client'
import { test } from 'tap'

import build from '@/app'

import { getJWtToken } from '../helper'

test('deleteProductById: delete a product as a read-only user', async (t) => {
    const prisma = new PrismaClient()

    // login as read-only user
    const readWirteJWT = await getJWtToken('USER00000001', 'password')

    t.ok(readWirteJWT)

    const server = build({})
    const productId = '123456789012'
    const response = await server.inject({
        method: 'DELETE',
        url: `/product/${productId}`,
        cookies: {
            jwt: readWirteJWT,
        },
    })
    server.close()

    t.ok(response)
    t.equal(response.statusCode, 403)
    t.equal(response.json().message, 'Not enough permission.')

    const product = await prisma.product.findFirst({
        where: {
            productId: productId,
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
    const productId = 'xxxxxxxxxxxx'
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

    // login as read-write user
    const readWirteJWT = await getJWtToken('USER00000002', 'password')

    t.ok(readWirteJWT)

    const server = build({})
    const productId = '123456789012'
    const response = await server.inject({
        method: 'DELETE',
        url: `/product/${productId}`,
        cookies: {
            jwt: readWirteJWT,
        },
    })
    server.close()

    t.ok(response)
    t.equal(response.statusCode, 204)

    const product = await prisma.product.findFirst({
        where: {
            productId: productId,
        },
    })
    prisma.$disconnect()

    t.notOk(product)

    t.end()
})
