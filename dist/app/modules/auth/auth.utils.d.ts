import jwt, { Secret } from "jsonwebtoken";
export declare const jwtHelper: {
    generateToken: <T>(payload: Record<string, unknown>, secret: Secret, expiresIn: T) => Promise<string>;
    verifyToken: (token: string, secret: string) => Promise<jwt.JwtPayload | null>;
};
//# sourceMappingURL=auth.utils.d.ts.map