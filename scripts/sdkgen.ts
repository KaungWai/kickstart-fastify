import { existsSync, mkdirSync } from 'fs'
import path from 'path'
import { generateApi } from 'swagger-typescript-api'

import build from '../src/app'
import { SYS_CONSTANTS } from '../src/constants/systemConstants'

const outputFolder = path.join(__dirname, '../../sdk');

const main = async () => {

    const server = build({})
    if (!existsSync(outputFolder)) {
        mkdirSync(outputFolder);
    }

    const response = await server.inject({
        method: 'GET',
        url: `/${SYS_CONSTANTS.SWAGGER_ROUTE}/json`,
    })

    const swaggerJson = JSON.parse(response.body);
    const title = swaggerJson.info.title as string;
    const version = swaggerJson.info.version as string;

    await generateApi({
        name: `${title.toLocaleLowerCase().replaceAll(' ', '_')}_${version}.ts`,
        output: outputFolder,
        spec: swaggerJson
    })
}

main();