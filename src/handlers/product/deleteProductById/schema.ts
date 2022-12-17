import { FastifySchema } from 'fastify'
import { deleteProductByIdParams } from './parameter'
import { deleteProductByIdResponse } from './response'

const description = `
# Delete product by productId
You can use some markdown syntaxs like header, lists and text formattings.
It would be nice to describe your api overivew here.
`

export const deleteProductByIdSchema: FastifySchema = {
    summary: `delete product by productId`,
    tags: ['Product'],
    description: description,
    params: deleteProductByIdParams,
    response: {
        204: deleteProductByIdResponse,
    },
}
