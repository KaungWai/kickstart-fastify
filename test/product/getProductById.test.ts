import 'module-alias/register'

import { test } from 'tap'

import build from '@/app'

import { getJWtToken } from '../helper'

test('getProductById: get a product as a read-only user', async (t) => {
    // login as read-only user
    const readWirteJWT = await getJWtToken('USER00000001', 'password')

    t.ok(readWirteJWT)

    const server = build({})
    const productId = '123456789012'
    const response = await server.inject({
        method: 'GET',
        url: `/product/${productId}`,
        cookies: {
            jwt: readWirteJWT,
        },
    })
    server.close()

    t.ok(response)
    t.equal(response.statusCode, 200)
    t.equal(response.json().result.productId, productId)
    t.equal(response.json().result.productName, 'Dummy Product')
    t.equal(response.json().result.productDescription, 'This is a dummy product')
    t.equal(response.json().result.productPrice, 9)

    t.end()
})

test('getProductById: get a unknown product as a read-write user', async (t) => {
    // login as read-write user
    const readWirteJWT = await getJWtToken('USER00000002', 'password')

    t.ok(readWirteJWT)

    const server = build({})
    const productId = 'xxxxxxxxxxxx'
    const response = await server.inject({
        method: 'GET',
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

test('getProductById: get a product as a read-write user', async (t) => {
    // login as read-write user
    const readWirteJWT = await getJWtToken('USER00000002', 'password')

    t.ok(readWirteJWT)

    const server = build({})
    const productId = '123456789012'
    const response = await server.inject({
        method: 'GET',
        url: `/product/${productId}`,
        cookies: {
            jwt: readWirteJWT,
        },
    })
    server.close()

    t.ok(response)
    t.equal(response.statusCode, 200)
    t.equal(response.json().result.productId, productId)
    t.equal(response.json().result.productName, 'Dummy Product')
    t.equal(response.json().result.productDescription, 'This is a dummy product')
    t.equal(response.json().result.productPrice, 9)

    t.end()
})
