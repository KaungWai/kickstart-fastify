import fastifyJwt, { FastifyJWTOptions } from '@fastify/jwt'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fs from 'fastify-plugin'
import { readFileSync } from 'fs'

import { SYS_CONSTANTS } from '@/constants/systemConstants'
import env from '@/utils/env'

// read key files
const privateKey = readFileSync(env.JWT_PRIVATE_KEY_PATH, { encoding: SYS_CONSTANTS.DEFAULT_ENCODING })
const publicKey = readFileSync(env.JWT_PUBLIC_KEY_PATH, { encoding: SYS_CONSTANTS.DEFAULT_ENCODING })

// jwt options
const jwtOptins: FastifyJWTOptions = {
    secret: {
        private: privateKey,
        public: publicKey,
    },
    sign: { algorithm: SYS_CONSTANTS.JWT_SIGN_ALGO },
    verify: { algorithms: [SYS_CONSTANTS.JWT_SIGN_ALGO] },
}

// register jwt plugin
export default fs(async function (server: FastifyInstance, options: FastifyPluginOptions, done: CallableFunction) {
    server.register(fastifyJwt, jwtOptins)
    done()
})
