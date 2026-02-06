import { createCipheriv, createDecipheriv } from 'node:crypto'
import { join } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'

import { getKeyIv } from './code.js'

const algo = 'aes-256-cbc'

/**
 * Encrypt a string
 * 
 * @param {string} str - The input string
 * @param {string} envFile - The env file path (relative to the process.cwd() value)
 * @returns {Promise<string>}
 */
export const encrypt = async (str, envFile = '.env') => {
    const [ keyBuff, ivBuff ] = await getKeyIv(envFile)
    const cipher = await createCipheriv(algo, keyBuff, ivBuff)
    const encrypted = Buffer.concat([
        cipher.update(str, 'utf8'),
        cipher.final(),
    ])

    return encrypted.toString('base64')
}

/**
 * Encrypt a string and write it the the env file
 * 
 * @param {string} str - The input string
 * @param {string} field - The env variable name
 * @param {string} envFile - The env file path (relative to the process.cwd() value)
 * @returns {Promise<void>}
 */
export const encryptAndSet = async (str, field, envFile = '.env') => {
    const encrypted = await encrypt(str, envFile)
    const path = join(process.cwd(), envFile)
    let fileContent = await readFile(path, 'utf-8')
    const regex = new RegExp(`^${field}=(.*)$`, 'm')
    const newLine = `${field}=${encrypted}`

    if (regex.test(fileContent)) fileContent = fileContent.replace(regex, newLine)
    else fileContent = fileContent + '\n' + newLine + '\n'

    try {
        await writeFile(path, fileContent, 'utf-8')
        console.log('\x1b[32m%s\x1b[0m', `Encrypted value of ${str} (${encrypted}) set in ${envFile}`)
    } catch (err) {
        console.log('\x1b[31m%s\x1b[0m', `Failed to write to ${envFile}`)
        
        throw err
    }
}

/**
 * Decrypt a string
 * 
 * @param {string} str - The input string
 * @param {string} envFile - The env file path (relative to the process.cwd() value)
 * @returns {Promise<string>}
 */
export const decrypt = async (str, envFile = '.env') => {
    const [ keyBuff, ivBuff ] = await getKeyIv(envFile)
    const decipher = await createDecipheriv(algo, keyBuff, ivBuff)
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(str, 'base64'), 'utf8'),
        decipher.final(),
    ])

    return decrypted.toString('base64')
}
