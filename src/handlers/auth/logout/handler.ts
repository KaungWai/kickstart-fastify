import { HttpErrors } from '@fastify/sensible'
import { RouteHandlerMethod } from 'fastify'
import { StatusCodes } from 'http-status-codes'

import { SYS_CONSTANTS } from '@/constants/systemConstants'

import { LogoutResponse, LogoutResult } from './response'

export const logoutHandler: RouteHandlerMethod = async function (request, reply): Promise<LogoutResponse | HttpErrors['HttpError']> {
    reply.clearCookie(SYS_CONSTANTS.JWT_COOKIE_KEY, { path: '/' })
    reply.status(StatusCodes.OK)

    const result: LogoutResult = {}
    const response: LogoutResponse = {
        result: result,
    }

    return response
}
