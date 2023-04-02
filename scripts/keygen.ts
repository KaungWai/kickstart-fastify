import { randomBytes } from 'crypto'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import path from 'path'

const outputFolder = path.join(__dirname, '../../keys')

const main = () => {
    if (!existsSync(outputFolder)) {
        mkdirSync(outputFolder)
    }
    const secret = randomBytes(256).toString('base64')
    writeFileSync(outputFolder + '/jwtsecret', secret)
}

main()
