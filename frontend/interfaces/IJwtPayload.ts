export default interface IJwtPayload {
    iss: string;
    aud: string;
    jti: string;
    sub: string;
    iat: number;
    nbf: number;
    exp: number;
}