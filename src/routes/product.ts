import { FastifyInstance } from 'fastify'
import fs from 'fastify-plugin'

import { createProductHandler } from '@/handlers/product/createProduct/handler'
import { createProductSchema } from '@/handlers/product/createProduct/schema'
import { deleteProductByIdHandler } from '@/handlers/product/deleteProductById/handler'
import { deleteProductByIdSchema } from '@/handlers/product/deleteProductById/schema'
import { getProductByIdHandler } from '@/handlers/product/getProductById/handler'
import { getProductByIdSchema } from '@/handlers/product/getProductById/schema'
import { getProductsHandler } from '@/handlers/product/getProducts/handler'
import { getProductsSchema } from '@/handlers/product/getProducts/schema'
import { updateProductHandler } from '@/handlers/product/updateProduct/handler'
import { updateProductSchema } from '@/handlers/product/updateProduct/schema'

const rootRoute = '/product'
const productId = ':productId'

// Router plugin
export default fs(async function (server: FastifyInstance) {
    // create a new product
    server.route({
        method: 'POST',
        url: `${rootRoute}`,
        preHandler: server.auth([server.verifyRW]),
        schema: createProductSchema,
        handler: createProductHandler,
    })

    // get a product by id
    server.route({
        method: 'GET',
        url: `${rootRoute}/${productId}`,
        preHandler: server.auth([server.verifyRO, server.verifyRW], { relation: 'or' }),
        schema: getProductByIdSchema,
        handler: getProductByIdHandler,
    })

    // get products by filter
    server.route({
        method: 'GET',
        url: `${rootRoute}`,
        preHandler: server.auth([server.verifyRO, server.verifyRW], { relation: 'or' }),
        schema: getProductsSchema,
        handler: getProductsHandler,
    })

    // update a product
    server.route({
        method: 'PUT',
        url: `${rootRoute}`,
        preHandler: server.auth([server.verifyRW]),
        schema: updateProductSchema,
        handler: updateProductHandler,
    })

    // deleate a product by id
    server.route({
        method: 'DELETE',
        url: `${rootRoute}/${productId}`,
        preHandler: server.auth([server.verifyRW]),
        schema: deleteProductByIdSchema,
        handler: deleteProductByIdHandler,
    })
})
