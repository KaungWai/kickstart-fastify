import 'module-alias/register'

import { test } from 'tap'

import build from '@/app'

test('root', async (t) => {
    const server = build({})
    const response = await server.inject({
        method: 'GET',
        url: '/',
    })
    server.close()

    t.equal(response.statusCode, 200)
    t.equal(response.json().name, 'Kickstart Fastify')
    t.equal(response.json().version, '1.0.4')
    t.equal(response.json().environment, 'test')

    t.end()
})
