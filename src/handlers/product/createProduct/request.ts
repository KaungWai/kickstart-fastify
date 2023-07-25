import { Static, Type } from '@sinclair/typebox'

import { field } from '@/schemas/fields'

export const createProductRequest = Type.Object(
    {
        productName: field.productName,
        productDescription: field.productDescription,
        productPrice: field.productPrice,
    },
    { $id: 'createProductRequest' },
)

export type CreateProductRequest = Static<typeof createProductRequest>
