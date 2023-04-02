import { Static, Type } from '@sinclair/typebox'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import envSchema from 'env-schema'

expand(config())

const EnvProps = Type.Object({
    HOST: Type.String(),
    PORT: Type.Number(),
    ENVIRONMENT: Type.Union([Type.Literal('development'), Type.Literal('production')]),
    ALLOWED_ORIGINS: Type.String(),
    JWT_SECRET: Type.String(),
})

const env: Static<typeof EnvProps> = envSchema({
    schema: EnvProps,
    data: process.env,
    dotenv: true,
})

export default env
