import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { AppError } from "../errors/ApplicationError";
import { Config } from "../../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../helpers/prisma";
import { jwtHelper } from "../modules/auth/auth.utils";
const AuthGuard = (...roles: string[]) => {
    return catchAsync(async (req, res, next) => {
        const token = req?.headers?.authorization?.split(" ")[1] as string;
        if (!token) {
            throw new AppError(
                StatusCodes.UNAUTHORIZED,
                "Unauthorized access. You must be logged in to continue."
            );
        }

        const token_info = (await jwtHelper.verifyToken(
            token,
            Config.ACCESS_TOKEN_SECRET as string
        )) as JwtPayload;
        if (!token_info) {
            throw new AppError(
                StatusCodes.UNAUTHORIZED,
                "Unauthorized access. You must be logged in to continue."
            );
        }
        const user = await prisma.user.findFirst({
            where: {
                username: token_info.username,
                role: token_info?.role,
            }, select: {
                id: true,
                isDeleted: true,
                username: true,
                role: true
            }
        });

        if (!user?.id) {
            throw new AppError(
                StatusCodes.NOT_FOUND,
                "Unauthorized access. You must be logged in to continue."
            );
        }


        if (user.isDeleted) {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                "Your account has been deleted. Please contact support if you think this is a mistake."
            );
        }


        if (roles.length && !roles.includes(token_info.role)) {
            throw new AppError(
                StatusCodes.FORBIDDEN,
                "Access forbidden. You do not have the required permissions to perform this action."
            );
        }

        req.user = token_info;
        next();
    });
};

export default AuthGuard;
