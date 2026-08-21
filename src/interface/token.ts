import { UserRole } from "../generated/prisma/enums";

export type TAuthUser = {
    username: string;
    userId: string;
    role: UserRole;
    vataId: string;
    iat: number;
    exp: number;
};