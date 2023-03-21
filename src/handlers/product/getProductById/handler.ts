import { HttpError } from '@fastify/sensible/lib/httpError'
import { RouteHandlerMethod } from 'fastify'
import { StatusCodes } from 'http-status-codes'

import { GetProductByIdParams } from './parameter'
import { GetProductByIdResponse,GetProductByIdResult } from './response'

export const getProductByIdHandler: RouteHandlerMethod = async function (request, reply): Promise<GetProductByIdResponse | HttpError> {
    const params = request.params as GetProductByIdParams

    const product = await this.prisma.product.findUnique({
        where: {
            productId: params.productId,
        },
    })

    if (!product) {
        return this.httpErrors.notFound('Product not found.')
    }

    const result: GetProductByIdResult = {
        productId: product.productId,
        productName: product.productName,
        productDescription: product.productDescription,
        productPrice: product.productPrice,
    }

    const response: GetProductByIdResponse = {
        result: result,
    }

    reply.status(StatusCodes.OK)

    return response
}
