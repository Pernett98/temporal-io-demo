import { KeyPairSyncResult, generateKeyPairSync, privateDecrypt, publicEncrypt } from 'crypto'

let keypair: KeyPairSyncResult<string, string>

export const genKeyPair = () => {
    keypair = generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        },
    })
    return keypair
}

export const encrypt = (text: string) => {
    const buffer = Buffer.from(text, 'utf-8')
    const encrypted = publicEncrypt(keypair.publicKey, buffer)
    return encrypted.toString('base64')
}

export const decrypt = (cipherText: string) => {
    const buffer = Buffer.from(cipherText, 'utf-8')
    const decrypted = privateDecrypt(keypair.privateKey, buffer)
    return decrypted.toString('base64')
}