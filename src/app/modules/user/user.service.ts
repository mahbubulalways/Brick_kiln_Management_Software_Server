import { StatusCodes } from "http-status-codes"
import { Prisma, User } from "../../../generated/prisma/client"
import { bcryptHelper } from "../../../helpers/bcryptHelper"
import { prisma } from "../../../helpers/prisma"
import { AppError } from "../../errors/ApplicationError"
import { TQuery } from "../../../interface/query"
import { paginationHelper } from "../../../helpers/paginationHelper"
import { createMetaConfig } from "../../../utils/createMetaConfig"
import { TAuthUser } from "../../../interface/token"



const createUserServie = async (user: TAuthUser, payload: User) => {
    const existUsername = await prisma.user.findFirst({
        where: {
            username: payload.username,
            vataId: user.vataId,
        },
    });

    if (existUsername) {
        throw new AppError(
            StatusCodes.CONFLICT,
            "এই ইউজারনেমটি ইতোমধ্যে ব্যবহার করা হয়েছে।"
        );
    }

    const hashPassword = await bcryptHelper.hashPassword(payload.password);

    payload.password = hashPassword;
    payload.vataId = user.vataId
    const result = await prisma.user.create({
        data: payload,
    });

    return result;
};

// Get All Users
const getAllUsersService = async (user: TAuthUser) => {
    const result = await prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            isDeleted: false,
            vataId: user.vataId
        }
    });

    return result;
};

// Get Single User
const getSingleUserService = async (user: TAuthUser, id: string) => {
    const result = await prisma.user.findFirst({
        where: {
            id,
            vataId: user.vataId
        },
    });

    return result;
};

// Update User
const updateUserService = async (
    userAuth: TAuthUser,
    id: string,
    payload: Partial<User>
) => {
    const user = await prisma.user.findFirst({
        where: {
            id,
            vataId: userAuth.vataId
        },
    });

    if (!user) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "ইউজার খুঁজে পাওয়া যায়নি।"
        );
    }

    // Username change হলে duplicate check
    if (payload.username && payload.username !== user.username) {
        const existUsername = await prisma.user.findFirst({
            where: {
                username: payload.username,
                vataId: userAuth.vataId,
                NOT: {
                    id,
                },
            },
        });

        if (existUsername) {
            throw new AppError(
                StatusCodes.CONFLICT,
                "এই ইউজারনেমটি ইতোমধ্যে ব্যবহার করা হয়েছে।"
            );
        }
    }

    // Password update হলে hash করা
    if (payload.password) {
        payload.password = await bcryptHelper.hashPassword(
            payload.password
        );
    }

    const result = await prisma.user.update({
        where: {
            id,
            vataId: userAuth.vataId
        },
        data: payload,
    });

    return result;
};

// Delete User
const deleteUserService = async (userAuth: TAuthUser, id: string) => {
    const user = await prisma.user.findFirst({
        where: {
            id,
            vataId: userAuth.vataId
        },
    });

    if (!user) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "ইউজার খুঁজে পাওয়া যায়নি।"
        );
    }

    await prisma.user.update({
        where: {
            id,
            vataId: userAuth.vataId
        },
        data: {
            isDeleted: true
        }

    });

    return null;
};


// GET LOGIN LOGOUT HISTORY

const getUserLoginHistoryService = async (user: TAuthUser, query: TQuery) => {
    const { limit, page, skip } = paginationHelper(query.page, query.limit)
    const [result, total] = await Promise.all([
        prisma.loginHistory.findMany({
            where: {
                user: {
                    vataId: user.vataId
                }
            },
            include:
                { user: { select: { name: true } } }
            , skip, take: limit,
            orderBy: { createdAt: "desc" }
        }),
        prisma.loginHistory.count({})
    ])

    const meta = createMetaConfig({
        limit: limit,
        page: page,
        totalData: total,
    });

    return {
        meta,
        data: result,
    };
}

// GET USER OPTIONS
const getUserOptionService = async (user:TAuthUser) => {
    const result = await prisma.user.findMany({
        where: {
            isDeleted: false,
              vataId:user.vataId
        },
        select: {
            name: true, id: true
        }
    })

    return result
}

export const UserService = {
    createUserServie,
    getAllUsersService,
    getSingleUserService,
    updateUserService,
    deleteUserService,
    getUserLoginHistoryService,
    getUserOptionService
};