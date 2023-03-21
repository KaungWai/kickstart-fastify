import { PrismaClient } from '@prisma/client'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fs from 'fastify-plugin'

const prisma = new PrismaClient()

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient
    }
}

export default fs(async function (server: FastifyInstance, options: FastifyPluginOptions, done: CallableFunction) {
    server.decorate('prisma', prisma)
    server.addHook('onClose', (instance) => {
        // close db connection on server stop
        instance.prisma.$disconnect()
    })
    done()
})
