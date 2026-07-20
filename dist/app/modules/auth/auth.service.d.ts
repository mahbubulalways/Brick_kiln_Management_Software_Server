import { IAuth } from "./auth.interface";
export declare const AuthService: {
    loginUserToSystemService: (payload: IAuth) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map