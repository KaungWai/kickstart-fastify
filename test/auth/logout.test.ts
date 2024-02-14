import 'module-alias/register'

import { test } from 'tap'

import build from '@/app'

test('logout', async (t) => {
    const server = build({})
    const response = await server.inject({
        method: 'POST',
        url: '/auth/logout',
    })
    server.close()

    t.equal(response.statusCode, 200)
    t.end()
})
