import { Static, Type } from '@sinclair/typebox'

import { field } from '@/schemas/fields'
import { handlerUtils } from '@/utils/handler'

export const deleteProductByIdParams = handlerUtils.buildParamSchema(
    Type.Object(
        {
            productId: field.productId,
        },
        { $id: 'deleteProductByIdParams' },
    ),
)

export type DeleteProductByIdParams = Static<typeof deleteProductByIdParams>
