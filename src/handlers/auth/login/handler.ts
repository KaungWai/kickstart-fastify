import { HttpError } from '@fastify/sensible/lib/httpError'
import { compareSync } from 'bcrypt'
import { RouteHandlerMethod } from 'fastify'
import { StatusCodes } from 'http-status-codes'

import { JWTPayload } from './model/JWTPayload'
import { LoginRequest } from './request'
import { LoginResponse, LoginResult } from './response'

export const loginHandler: RouteHandlerMethod = async function (request, reply): Promise<LoginResponse | HttpError> {
    const body = request.body as LoginRequest
    const errMessage = 'User id or password is invalid.'

    const user = await this.prisma.user.findUnique({
        where: {
            userId: body.userId,
        },
    })

    if (!user) {
        return this.httpErrors.unauthorized(errMessage)
    }

    if (compareSync(body.password, user.hash) == false) {
        return this.httpErrors.unauthorized(errMessage)
    }

    const payload: JWTPayload = {
        userId: user.userId,
        userName: user.userName,
        permission: user.permission,
    }

    const jwt = this.jwt.sign(payload)

    reply.setCookie(`jwt`, jwt, {
        sameSite: true,
        maxAge: 2 * 3600 * 1000,
        httpOnly: true,
        path: '/',
    })

    reply.status(StatusCodes.OK)

    const result: LoginResult = null

    const response: LoginResponse = {
        result: result,
    }

    return response
}
