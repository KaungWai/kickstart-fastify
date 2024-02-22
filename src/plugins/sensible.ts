import fastifySensible from '@fastify/sensible'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fs from 'fastify-plugin'

export default fs(function (server: FastifyInstance, options: FastifyPluginOptions, done: CallableFunction) {
    server.register(fastifySensible, options)
    done()
})
