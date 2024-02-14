import fastifyAutoload from '@fastify/autoload'
import fastify from 'fastify'
import path from 'path'

import env from '@/utils/env'
import { getAppVersion } from '@/utils/misc'

const build = (opts = {}) => {
    // fastify instance
    const app = fastify(opts)

    // autoload plugins and routes
    app.register(fastifyAutoload, { dir: path.join(__dirname, 'plugins') })
    app.register(fastifyAutoload, { dir: path.join(__dirname, 'routes') })

    // root
    app.get('/', (requst, reply) => {
        reply.send({ name: 'Kickstart Fastify', version: getAppVersion(), environment: env.ENVIRONMENT })
        return
    })

    return app
}

export default build
