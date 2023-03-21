import { Static, Type } from '@sinclair/typebox'

import { field } from '@/schemas/fields'

export const getProductByIdParams = Type.Object({
    productId: field.productId,
})

export type GetProductByIdParams = Static<typeof getProductByIdParams>
