import { FastifySchema } from 'fastify'

import { getProductsQuery } from './query'
import { getProductsResponse } from './response'

const description = `
# Get procucts
You can use some markdown syntaxs like header, lists and text formattings.
It would be nice to describe your api overivew here.
`

export const getProductsSchema: FastifySchema = {
    summary: `get products by filter`,
    tags: ['Product'],
    description: description,
    querystring: getProductsQuery,
    response: {
        200: getProductsResponse,
    },
}
