import { Static, Type } from '@sinclair/typebox'

import { field } from '@/schemas/fields'

import { handlerUtils } from './../../../utils/handler'

export const createProductResult = Type.Object(
    {
        productId: field.productId,
        productName: field.productName,
        productDescription: field.productDescription,
        productPrice: field.productPrice,
    },
    { $id: 'createProductResult' },
)

export const createProductResponse = handlerUtils.buildResponseSchema(createProductResult, 'createProductResponse')

export type CreateProductResult = Static<typeof createProductResult>

export type CreateProductResponse = Static<typeof createProductResponse>
