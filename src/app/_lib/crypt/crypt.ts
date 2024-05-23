import crypto from 'crypto';
import bcrypt from 'bcrypt';

function encrypt(
    secretKey: string, 
    text: string, 
    algorithm: crypto.CipherGCMTypes = "aes-256-gcm"
): {
    iv: string;
    content: string;
} {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
}

function decrypt(
    secretKey: string, 
    hash: {iv: string, content: string}, 
    algorithm: crypto.CipherGCMTypes = "aes-256-gcm"
): string {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
    return decrpyted.toString();
}

async function toHash(text: string, saltRounds: number = 10): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(text, salt);
    return hash;
}
async function compareHash(text: string, hash: string): Promise<boolean> {
    const match = await bcrypt.compare(text, hash);
    return match;
}
async function generateToken(length: number = 32): Promise<string> {
    return crypto.randomBytes(length).toString('hex');
}


export {
    encrypt,
    decrypt,
    toHash,
    compareHash,
    generateToken,
}
