import 'module-alias/register'

import { test } from 'tap'

import build from '@/app'

test('login: unknown user login fail test', async (t) => {
    const server = build({})
    const payload = {
        userId: 'USER00000000',
        password: 'password',
    }
    const response = await server.inject({
        method: 'POST',
        url: '/auth/login',
        payload: payload,
    })
    server.close()

    t.equal(response.statusCode, 401)
    t.end()
})

test('login: READONLY user login fail test', async (t) => {
    const server = build({})
    const payload = {
        userId: 'USER00000001',
        password: 'password-wrong',
    }
    const response = await server.inject({
        method: 'POST',
        url: '/auth/login',
        payload: payload,
    })
    server.close()

    t.equal(response.statusCode, 401)
    t.end()
})

test('login: READONLY user login success test', async (t) => {
    const server = build({})
    const payload = {
        userId: 'USER00000001',
        password: 'password',
    }
    const response = await server.inject({
        method: 'POST',
        url: '/auth/login',
        payload: payload,
    })
    server.close()

    t.equal(response.statusCode, 200)
    t.end()
})

test('login: READWRITE user login fail test', async (t) => {
    const server = build({})
    const payload = {
        userId: 'USER00000002',
        password: 'password-wrong',
    }
    const response = await server.inject({
        method: 'POST',
        url: '/auth/login',
        payload: payload,
    })
    server.close()

    t.equal(response.statusCode, 401)
    t.end()
})

test('login: READWRITE user login success test', async (t) => {
    const server = build({})
    const payload = {
        userId: 'USER00000002',
        password: 'password',
    }
    const response = await server.inject({
        method: 'POST',
        url: '/auth/login',
        payload: payload,
    })
    server.close()

    t.equal(response.statusCode, 200)
    t.end()
})
