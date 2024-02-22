import fastifyCors, { FastifyCorsOptions } from '@fastify/cors'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fs from 'fastify-plugin'

import env from '@/utils/env'

// cors options
const allowedOrigins = env.ALLOWED_ORIGINS.split(',')
const corsOptions: FastifyCorsOptions = {
    origin: (origin, cb) => {
        if (!origin) {
            if (env.ENVIRONMENT === 'development' || env.ENVIRONMENT === 'test') {
                // allow unknown origin in development mode
                cb(null, true)
                return
            } else {
                // deny
                cb(new Error('Not allowed: unkown origin'), false)
                return
            }
        }

        // from remote origins
        const remoteURL = new URL(origin)
        const hostname = remoteURL.hostname + `${remoteURL.port && remoteURL.port != '' ? ':' + remoteURL.port : ''}`
        if (allowedOrigins.indexOf(hostname) >= 0) {
            // pass
            cb(null, true)
            return
        }

        // deny
        cb(new Error(`Not Allowed: ${remoteURL}`), false)
    },
}

export default fs(function (server: FastifyInstance, options: FastifyPluginOptions, done: CallableFunction) {
    server.register(fastifyCors, corsOptions)
    done()
})
