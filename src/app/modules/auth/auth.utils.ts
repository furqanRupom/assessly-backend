import jwt, { JwtPayload, Secret } from 'jsonwebtoken';


/* create token  */

export const createToken = (
    jwtPayload: { userId: string; role: string },
    secret: Secret,
    expiresIn: jwt.SignOptions['expiresIn'],
) => {
    return jwt.sign(jwtPayload, secret, { expiresIn  });
};


/* token verify  */

export const tokenVerify = (
    encryptedToken: string,
    secret: string,
) => {
    return jwt.verify(encryptedToken, secret) as JwtPayload;
};

export function generateOtp(length: number = 6): string {
    let otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
}