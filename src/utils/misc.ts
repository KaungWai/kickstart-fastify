import { readFileSync } from 'fs'
import path from 'path'

import { SYS_CONSTANTS } from '@/constants/systemConstants'

/**
 * Returns the root path of the project.
 * @returns {string} The root path of the project.
 */
const getRootPath = (): string => {
    return path.join(__dirname, '../../../')
}

/**
 * Returns the application version.
 * @returns {string} The application version.
 */
const getAppVersion = (): string => {
    return JSON.parse(readFileSync(path.join(getRootPath(), './package.json'), SYS_CONSTANTS.DEFAULT_ENCODING)).version
}

export { getAppVersion, getRootPath }
