import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fs from 'fastify-plugin'

import env from '@/utils/env'
import { getAppVersion } from '@/utils/misc'

export default fs(async function (server: FastifyInstance, _options: FastifyPluginOptions, done: CallableFunction) {
    if (env.ENVIRONMENT == 'development') {
        server.register(fastifySwagger, {
            openapi: {
                info: {
                    title: 'Kickstart Fastify',
                    description: 'Swagger API documentation',
                    version: getAppVersion(),
                },
                externalDocs: {
                    url: 'https://swagger.io',
                    description: 'Find more info here',
                },
                servers: [{
                    url: `${env.HOST}${env.PORT == 80 ? '' : ':' + env.PORT}`
                }],
            },
        })
        server.register(fastifySwaggerUi, {
            routePrefix: '/docs',
        })
    }
    done()
})
