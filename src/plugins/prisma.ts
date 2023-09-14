import { PrismaClient } from '@prisma/client'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fs from 'fastify-plugin'

const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
        {
            emit: 'event',
            level: 'error',
        },
    ],
})

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient
    }
}

export default fs(async function (server: FastifyInstance, options: FastifyPluginOptions, done: CallableFunction) {
    prisma.$on('query', (e) => {
        e.query = e.query.replaceAll('"', '')
        e.params = e.params.replaceAll('"', "'")
        server.log.debug(e, 'prisma query')
    })

    prisma.$on('info', (e) => {
        server.log.info(e, 'prisma info')
    })

    prisma.$on('warn', (e) => {
        server.log.warn(e, 'prisma warning')
    })

    prisma.$on('error', (e) => {
        server.log.error(e, 'prisma error')
    })

    server.decorate('prisma', prisma)
    server.addHook('onClose', (instance) => {
        // close db connection on server stop
        instance.prisma.$disconnect()
    })
    done()
})
