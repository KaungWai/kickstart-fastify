import type { FastifyCookieOptions } from '@fastify/cookie'
import cookie from '@fastify/cookie'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fs from 'fastify-plugin'

const cookieOptions: FastifyCookieOptions = {
    secret: 'test',
    hook: 'onRequest',
    parseOptions: {},
}

export default fs(function (server: FastifyInstance, options: FastifyPluginOptions, done: CallableFunction) {
    server.register(cookie, cookieOptions)
    done()
})
