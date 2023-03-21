import { Static, Type } from '@sinclair/typebox'

import { field } from '@/schemas/fields'

export const deleteProductByIdParams = Type.Object({
    productId: field.productId,
})

export type DeleteProductByIdParams = Static<typeof deleteProductByIdParams>
