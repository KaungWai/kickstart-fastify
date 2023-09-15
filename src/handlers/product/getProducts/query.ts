import { Static, Type } from '@sinclair/typebox'

import { field } from '@/schemas/fields'
import { handlerUtils } from '@/utils/handler'

export const getProductsQuery = handlerUtils.buildQuerySchema(
    Type.Object(
        {
            productId: Type.Optional(field.productId),
            productName: Type.Optional(field.productName),
            productDescription: Type.Optional(field.productDescription),
            productPriceFrom: Type.Optional(field.productPrice),
            productPriceTo: Type.Optional(field.productPrice),
        },
        { $id: 'getProductsQuery' },
    ),
)

export type GetProductsQuery = Static<typeof getProductsQuery>
