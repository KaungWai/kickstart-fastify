import 'module-alias/register'

import { FastifyListenOptions } from 'fastify'

import build from '@/app'
import env from '@/utils/env'

// logger configs
const logConfigs = {
    development: {
        level: 'debug',
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'yyyy-MM-dd HH:mm:ss.l Z',
            },
        },
    },
    production: {
        level: 'info',
    },
}

// server config
const opts: FastifyListenOptions = {
    host: env.HOST,
    port: env.PORT,
}

const server = build({
    logger: logConfigs[env.ENVIRONMENT],
})

// boot process
server.ready((e) => {
    if (e) throw e
})

// listen
server.listen(opts, (err) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
})
