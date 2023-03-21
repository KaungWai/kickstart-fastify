import { RouteHandlerMethod } from 'fastify'
import { StatusCodes } from 'http-status-codes'

import { GetProductsQuery } from './query'
import { GetProductsResponse, GetProductsResult } from './response'

export const getProductsHandler: RouteHandlerMethod = async function (request, reply): Promise<GetProductsResponse> {
    const query = request.query as GetProductsQuery

    const products = await this.prisma.product.findMany({
        where: {
            productId: query.productId,
            productName: {
                contains: query.productName,
            },
            productDescription: {
                contains: query.productDescription,
            },
            productPrice: {
                gte: query.productPriceFrom,
                lte: query.productPriceTo,
            },
        },
    })

    const result: GetProductsResult = products.map((x) => {
        return {
            productId: x.productId,
            productName: x.productName,
            productDescription: x.productDescription,
            productPrice: x.productPrice,
        }
    })

    const response: GetProductsResponse = {
        result: result,
        message: result.length > 0 ? '' : 'There are no products matched to search conditions.',
    }

    reply.status(StatusCodes.OK)

    return response
}
