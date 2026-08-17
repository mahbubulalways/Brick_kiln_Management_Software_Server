import { StatusCodes } from "http-status-codes"
import { Prisma, User } from "../../../generated/prisma/client"
import { bcryptHelper } from "../../../helpers/bcryptHelper"
import { prisma } from "../../../helpers/prisma"
import { AppError } from "../../errors/ApplicationError"
import { TQuery } from "../../../interface/query"
import { paginationHelper } from "../../../helpers/paginationHelper"
import { createMetaConfig } from "../../../utils/createMetaConfig"



const createUserServie = async (payload: User) => {
    const existUsername = await prisma.user.findFirst({
        where: {
            username: payload.username,
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

    const result = await prisma.user.create({
        data: payload,
    });

    return result;
};

// Get All Users
const getAllUsersService = async () => {
    const result = await prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            isDeleted: false
        }
    });

    return result;
};

// Get Single User
const getSingleUserService = async (id: string) => {
    const user = await prisma.user.findFirst({
        where: {
            id,
        },
    });

    return user;
};

// Update User
const updateUserService = async (
    id: string,
    payload: Partial<User>
) => {
    const user = await prisma.user.findFirst({
        where: {
            id,
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
        },
        data: payload,
    });

    return result;
};

// Delete User
const deleteUserService = async (id: string) => {
    const user = await prisma.user.findFirst({
        where: {
            id,
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
        },
        data: {
            isDeleted: true
        }

    });

    return null;
};


// GET LOGIN LOGOUT HISTORY

const getUserLoginHistoryService = async (query: TQuery) => {
    const { limit, page, skip } = paginationHelper(query.page, query.limit)
    const [result, total] = await Promise.all([
        prisma.loginHistory.findMany({
            include:
                { user: { select: { name: true } } }
            , skip, take: limit,
            orderBy:{createdAt:"desc"}
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
const getUserOptionService = async () => {
    const result = await prisma.user.findMany({
        where: {
            isDeleted: false
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