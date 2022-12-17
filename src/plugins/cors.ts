import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fs from 'fastify-plugin'

import fastifyCors, { FastifyCorsOptions } from '@fastify/cors'

import env from '@/utils/env'

// cors options
const allowedOrigins = env.ALLOWED_ORIGINS.split(',')
const corsOptions: FastifyCorsOptions = {
    origin: (origin, cb) => {
        if (!origin) {
            if (env.ENVIRONMENT === 'development') {
                // allow unknown origin in development mode
                cb(null, true)
                return
            } else {
                // deny
                cb(new Error('Not Allowed'), false)
                return
            }
        }

        // from remote origins
        const remoteURL = new URL(origin)
        const hostname = `${remoteURL.hostname}:${remoteURL.port}`
        if (allowedOrigins.indexOf(hostname) >= 0) {
            // pass
            cb(null, true)
            return
        }

        // deny
        cb(new Error('Not Allowed'), false)
    },
}

export default fs(async function (server: FastifyInstance, options: FastifyPluginOptions, done: CallableFunction) {
    server.register(fastifyCors, corsOptions)
    done()
})
