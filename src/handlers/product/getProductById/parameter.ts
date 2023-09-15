import { Static, Type } from '@sinclair/typebox'

import { field } from '@/schemas/fields'
import { handlerUtils } from '@/utils/handler'

export const getProductByIdParams = handlerUtils.buildParamSchema(
    Type.Object(
        {
            productId: field.productId,
        },
        { $id: 'getProductByIdParams' },
    ),
)

export type GetProductByIdParams = Static<typeof getProductByIdParams>
