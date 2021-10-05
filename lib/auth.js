import { hash, compare } from 'bcryptjs';

export async function hashPassword(password) {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
}

export async function matchedPassword(password, hashedPassword) {
    const verify = await compare(password, hashedPassword);
    return verify;
}
