import fastifyAuth, { FastifyAuthFunction } from '@fastify/auth'
import { Permission } from '@prisma/client/index'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fs from 'fastify-plugin'

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
            const jwtString = request.cookies.jwt ?? ''
            const incomingPayload = this.jwt.verify(jwtString).valueOf() as JwtPayLoad
            if (incomingPayload.permission !== permission) {
                throw this.httpErrors.forbidden('Not enough permission.')
            }
        } catch (error) {
            done(error)
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
