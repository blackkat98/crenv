declare const setCode: (envFile?: string) => Promise<void>
declare const getCode: (envFile?: string) => Promise<string>
declare const getKeyIv: (envFile?: string) => Promise<string[]>

declare const encrypt: (str: string, envFile?: string) => Promise<string>
declare const encryptAndSet: (str: string, field: string, envFile?: string) => Promise<void>
declare const decrypt: (str: string, envFile?: string) => Promise<string>

export { setCode, getCode, getKeyIv, encrypt, encryptAndSet, decrypt }
