import fastifyHelmet, { FastifyHelmetOptions } from '@fastify/helmet'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fs from 'fastify-plugin'

// helmet options
const helmetOptions: FastifyHelmetOptions = {
    // Cors is managed by another Plugin (./cors.ts)
    crossOriginResourcePolicy: false,
}

export default fs(async function (server: FastifyInstance, options: FastifyPluginOptions, done: CallableFunction) {
    server.register(fastifyHelmet, helmetOptions)
    done()
})
