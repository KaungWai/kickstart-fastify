import fastifyJwt, { FastifyJWTOptions } from '@fastify/jwt'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fs from 'fastify-plugin'
import { readFileSync } from 'fs'

import { SYS_CONSTANTS } from '@/constants/systemConstants'
import env from '@/utils/env'

// read key files
const jwtSecret = readFileSync(env.JWT_SECRET, { encoding: SYS_CONSTANTS.DEFAULT_ENCODING })

// jwt options
const jwtOptins: FastifyJWTOptions = {
    secret: jwtSecret,
}

// register jwt plugin
export default fs(async function (server: FastifyInstance, options: FastifyPluginOptions, done: CallableFunction) {
    server.register(fastifyJwt, jwtOptins)
    done()
})
