import { HttpError } from '@fastify/sensible/lib/httpError'
import { RouteHandlerMethod } from 'fastify'
import { StatusCodes } from 'http-status-codes'

import { DeleteProductByIdParams } from './parameter'
import { DeleteProductByIdResponse,DeleteProductByIdResult } from './response'

export const deleteProductByIdHandler: RouteHandlerMethod = async function (request, reply): Promise<DeleteProductByIdResponse | HttpError> {
    const params = request.params as DeleteProductByIdParams

    const product = await this.prisma.product.findUnique({
        where: {
            productId: params.productId,
        },
    })

    if (!product) {
        return this.httpErrors.notFound('Product not found.')
    }

    await this.prisma.product.delete({
        where: {
            productId: params.productId,
        },
    })

    const result: DeleteProductByIdResult = null

    const response: DeleteProductByIdResponse = {
        result: result,
    }

    reply.status(StatusCodes.NO_CONTENT)

    return response
}
