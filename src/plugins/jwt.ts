import fastifyJwt, { FastifyJWTOptions } from '@fastify/jwt'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fs from 'fastify-plugin'
import { readFileSync } from 'fs'
import path from 'path'

import { SYS_CONSTANTS } from '@/constants/systemConstants'
import env from '@/utils/env'
import { getRootPath } from '@/utils/misc'

// secret key path
const secretPath = env.ENVIRONMENT === 'development' || env.ENVIRONMENT === 'test' ? path.join(getRootPath(), './keys/jwtsecret') : env.JWT_SECRET

// read key files
const jwtSecret = readFileSync(secretPath, { encoding: SYS_CONSTANTS.DEFAULT_ENCODING })

// jwt options
const jwtOptins: FastifyJWTOptions = {
    secret: jwtSecret,
}

// register jwt plugin
export default fs(function (server: FastifyInstance, options: FastifyPluginOptions, done: CallableFunction) {
    server.register(fastifyJwt, jwtOptins)
    done()
})
