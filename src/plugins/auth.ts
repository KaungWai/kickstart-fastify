import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fs from 'fastify-plugin'
import fastifyAuth, { FastifyAuthFunction } from '@fastify/auth'
import { Permission } from '@prisma/client/index'

declare module 'fastify' {
    interface FastifyInstance {
        verifyRO: FastifyAuthFunction
        verifyRW: FastifyAuthFunction
    }
}

type JwtPayLoad = {
    permission: Permission
}

// auth function factory
const authFactory = (permission: Permission): FastifyAuthFunction => {
    const authFunction: FastifyAuthFunction = function (request, _reply, done: CallableFunction) {
        try {
            const { apiKey } = request.headers as { apiKey: string }
            const incomingPayload = this.jwt.verify(apiKey).valueOf() as JwtPayLoad
            if (incomingPayload.permission !== permission) {
                throw this.httpErrors.forbidden('Not enough permission.')
            }
        } catch (error) {
            done(error)
        } finally {
            done()
        }
    }
    return authFunction
}

const verifyRO: FastifyAuthFunction = authFactory(Permission.READ_ONLY)
const verifyRW: FastifyAuthFunction = authFactory(Permission.READ_WRITE)

export default fs(async function (server: FastifyInstance, options: FastifyPluginOptions, done: CallableFunction) {
    server.decorate('verifyRO', verifyRO)
    server.decorate('verifyRW', verifyRW)
    server.register(fastifyAuth, options)
    done()
})
