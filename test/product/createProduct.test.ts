import 'module-alias/register'

import { PrismaClient } from '@prisma/client'
import { test } from 'tap'

import build from '@/app'

import { getJWtToken } from '../helper'

test('createProduct: register new product as a read-only user', async (t) => {
    const prisma = new PrismaClient()

    // login as read-only user
    const readWirteJWT = await getJWtToken('USER00000001', 'password')

    t.ok(readWirteJWT)

    const server = build({})
    const payload = {
        productName: 'productName',
        productDescription: 'productDescription',
        productPrice: 1500,
    }

    const response = await server
        .inject({
            method: 'POST',
            url: '/product',
            payload,
            cookies:{
                jwt: readWirteJWT
            }
        })
    server.close()

    t.ok(response)
    t.equal(response.statusCode, 403)
    t.equal(response.json().message, 'Not enough permission.')

    const product = await prisma.product.findFirst({
        where: {
            productName: payload.productName
        }
    })
    prisma.$disconnect()

    t.notOk(product)

    t.end()
})

test('createProduct: register new product as a read-write user', async (t) => {
    const prisma = new PrismaClient()

    // login as read-write user
    const readWirteJWT = await getJWtToken('USER00000002', 'password')

    t.ok(readWirteJWT)

    const server = build({})
    const payload = {
        productName: 'productName',
        productDescription: 'productDescription',
        productPrice: 1500,
    }

    const response = await server
        .inject({
            method: 'POST',
            url: '/product',
            payload,
            cookies:{
                jwt: readWirteJWT
            }
        })

    t.ok(response)
    t.equal(response.statusCode, 201)
    t.equal(response.json().message, 'New product is successfully created.')
    t.equal(response.json().result.productName, payload.productName)
    t.equal(response.json().result.productDescription, payload.productDescription)
    t.equal(response.json().result.productPrice, payload.productPrice)

    server.close()

    const product = await prisma.product.findFirst({
        where: {
            productName: payload.productName
        }
    })
    prisma.$disconnect()

    t.ok(product)
    t.ok(product?.productId)
    t.equal(product?.productName, payload.productName)
    t.equal(product?.productDescription, payload.productDescription)
    t.equal(product?.productPrice, payload.productPrice)

    t.end()
})