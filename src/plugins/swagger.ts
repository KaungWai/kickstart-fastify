import { readdirSync, statSync } from 'node:fs'

import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fs from 'fastify-plugin'
import { OpenAPIV3 } from 'openapi-types'
import systemPath from 'path'
import path from 'path'

import { SYS_CONSTANTS } from '@/constants/systemConstants'
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
                servers: [
                    {
                        url: `http://${env.HOST}${env.PORT == 80 ? '' : ':' + env.PORT}`,
                    },
                ],
            },
            refResolver: {
                clone: false,
                buildLocalReference(json, _baseUri, _fragment, i) {
                    const id = json.$id as string
                    return id || `def-${i}`
                },
            },
        })
        server.register(fastifySwaggerUi, {
            routePrefix: SYS_CONSTANTS.SWAGGER_ROUTE,
        })

        const schemas = autoloadSchemas(path.join(__dirname, '../handlers/'))
        for (const key in schemas) {
            server.addSchema(schemas[key])
        }
    }
    done()
})

// thanks to https://github.com/Neamar/auto-load
const autoloadSchemas = function (path: string) {
    let obj: { [key: string]: object } = {}
    readdirSync(path).forEach(function (item) {
        const fullPath = path + '/' + item
        const stats = statSync(fullPath)
        if (stats.isFile()) {
            const extension = systemPath.extname(item)
            if (extension === '.js') {
                obj = { ...obj, ...require(fullPath) }
            }
        } else if (stats.isDirectory()) {
            obj = { ...obj, ...autoloadSchemas(fullPath) }
        }
    })
    const onlySchemaObj: { [key: string]: OpenAPIV3.SchemaObject } = {}
    for (const key in obj) {
        if (Reflect.get(obj[key], SYS_CONSTANTS.SCHEMA_SYMBOL)) {
            onlySchemaObj[key] = obj[key] as OpenAPIV3.SchemaObject
        }
    }
    return onlySchemaObj
}
