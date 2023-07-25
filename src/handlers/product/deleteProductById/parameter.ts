import { Static, Type } from '@sinclair/typebox'

import { field } from '@/schemas/fields'

export const deleteProductByIdParams = Type.Object(
    {
        productId: field.productId,
    },
    { $id: 'deleteProductByIdParams' },
)

export type DeleteProductByIdParams = Static<typeof deleteProductByIdParams>
