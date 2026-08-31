
import { AppError } from "../../../errors/ApplicationError";
import { prisma } from "../../../../helpers/prisma";
import { UserRole } from "../../../../generated/prisma/client";
import { bcryptHelper } from "../../../../helpers/bcryptHelper";
import { StatusCodes } from "http-status-codes";



const createSuperAdminService = async (
    payload: {
        username: string;
        password: string;
        name: string;
    },
) => {
    // Check existing super admin
    const existingAdmin = await prisma.user.findFirst({
        where: {
            username: payload.username,
            role: UserRole.SUPER_ADMIN,
            isDeleted: false,
        },
    });

    if (existingAdmin) {
        throw new AppError(
            StatusCodes.CONFLICT,
            "এই ইউজারনেম দিয়ে ইতোমধ্যে একজন রয়েছে",
        );
    }

    // Hash password
    const hashedPassword =
        await bcryptHelper.hashPassword(payload.password);
    // Create super admin
    const user = await prisma.user.create({
        data: {
            password: hashedPassword,
            username: payload.username,
            role: UserRole.SUPER_ADMIN,
            name: payload.name,
        },
    });

    return user;
};

export const AdminService = {
    createSuperAdminService,
};