import { HttpErrors } from '@fastify/sensible'
import { RouteHandlerMethod } from 'fastify'
import { StatusCodes } from 'http-status-codes'

import { UpdateProductRequest } from './request'
import { UpdateProductResponse, UpdateProductResult } from './response'

export const updateProductHandler: RouteHandlerMethod = async function (request, reply): Promise<UpdateProductResponse | HttpErrors['HttpError']> {
    const body = request.body as UpdateProductRequest

    const product = await this.prisma.product.findUnique({
        where: {
            productId: body.productId,
        },
    })

    if (!product) {
        return this.httpErrors.notFound('Product not found.')
    }

    const productUpdated = await this.prisma.product.update({
        where: {
            productId: body.productId,
        },
        data: {
            productName: body.productName,
            productDescription: body.productDescription,
            productPrice: body.productPrice,
            updatedAt: new Date(),
        },
    })

    const result: UpdateProductResult = {
        productId: productUpdated.productId,
        productName: productUpdated.productName,
        productDescription: productUpdated.productDescription,
        productPrice: productUpdated.productPrice,
    }

    const response: UpdateProductResponse = {
        result: result,
        message: 'Product is successfully updated.',
    }

    reply.status(StatusCodes.CREATED)

    return response
}
