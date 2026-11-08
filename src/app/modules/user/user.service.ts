import { StatusCodes } from "http-status-codes";
import { Prisma, User } from "../../../generated/prisma/client";
import { bcryptHelper } from "../../../helpers/bcryptHelper";
import { prisma } from "../../../helpers/prisma";
import { AppError } from "../../errors/ApplicationError";
import { TQuery } from "../../../interface/query";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { TAuthUser } from "../../../interface/token";
import { ActivityService } from "../activity/activity.service";

const createUserServie = async (user: TAuthUser, payload: User) => {
  const existUsername = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: payload.username,
          vataId: user.vataId,
        },
        {
          vataId: user.vataId,
          email: payload.email,
        },
      ],
    },
  });
  if (existUsername?.username === payload.username) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "এই ইউজারনেমটি  ইতোমধ্যে ব্যবহার করা হয়েছে।",
    );
  }

  if (existUsername?.email === payload.email) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "এই ইমেইলটি ইতোমধ্যে ব্যবহার করা হয়েছে।",
    );
  }

  const hashPassword = await bcryptHelper.hashPassword(payload.password);
  payload.password = hashPassword;
  payload.vataId = user.vataId;
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
      vataId: user.vataId,
    },
    include: {
      loginLimits: {
        select: {
          status: true,
          blockTime: true,
          totalTry: true,
          id: true,
        },
      },
    },
  });

  return result;
};

// Get Single User
const getSingleUserService = async (user: TAuthUser, id: string) => {
  const result = await prisma.user.findFirst({
    where: {
      id,
      vataId: user.vataId,
    },
  });

  return result;
};

// UPDATE USER
const updateUserService = async (
  userAuth: TAuthUser,
  id: string,
  payload: Partial<User>,
) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      id,
      vataId: userAuth.vataId,
    },
  });

  if (!existingUser) {
    throw new AppError(StatusCodes.NOT_FOUND, "ইউজার খুঁজে পাওয়া যায়নি।");
  }

  const isEmailExist = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (isEmailExist) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "এই ইমেইলটি ইতোমধ্যে ব্যবহার করা হয়েছে।",
    );
  }

  if (payload.username && payload.username !== existingUser.username) {
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
        "এই ইউজারনেমটি ইতোমধ্যে ব্যবহার করা হয়েছে।",
      );
    }
  }

  const oldData = {
    username: existingUser.username,
    role: existingUser.role,
    name: existingUser.name,
    email: existingUser.email,
  };

  const newData = {
    username: payload.username ?? existingUser.username,
    role: payload.role ?? existingUser.role,
    name: payload.name ?? existingUser.name,
    email: payload.email ?? existingUser.email,
  };

  if (userAuth.role === "ADMIN" || userAuth.role === "OWNER") {
    const updateData = { ...payload };

    if (updateData.password) {
      updateData.password = await bcryptHelper.hashPassword(
        updateData.password,
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const result = await tx.user.update({
        where: {
          id,
        },
        data: {
          ...updateData,
          updateStatus: "APPROVED",
        },
      });

      await ActivityService.createActivityService({
        tx,
        action: "UPDATE",
        module: "USER",
        targetId: id,
        userId: userAuth.userId,
        vataId: userAuth.vataId,
        oldData,
        newData,
        referenceNumber: oldData.name,
      });

      return result;
    });

    return {
      result,
      message: "ইউজারের তথ্য সফলভাবে আপডেট করা হয়েছে।",
    };
  }

  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      await tx.user.update({
        where: {
          id,
        },
        data: {
          updateStatus: "PENDING",
        },
      });

      return await tx.approvalRequest.create({
        data: {
          action: "UPDATE",
          module: "USER",
          targetId: id,
          requestedById: userAuth.userId,
          vataId: userAuth.vataId,
          status: "PENDING",
          oldData,
          newData,
        },
      });
    },
  );

  return {
    result,
    message: "ইউজারের তথ্য আপডেটের অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে।",
  };
};

// DELETE USER
const deleteUserService = async (userAuth: TAuthUser, id: string) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      id,
      vataId: userAuth.vataId,
    },
  });

  if (!existingUser) {
    throw new AppError(StatusCodes.NOT_FOUND, "ইউজার খুঁজে পাওয়া যায়নি।");
  }

  const oldData = {
    username: existingUser.username,
    role: existingUser.role,
    name: existingUser.name,
  };

  if (userAuth.role === "ADMIN" || userAuth.role === "OWNER") {
    const result = await prisma.$transaction(async (tx) => {
      const result = await tx.user.update({
        where: {
          id,
        },
        data: {
          isDeleted: true,
          deleteStatus: "APPROVED",
        },
      });

      await ActivityService.createActivityService({
        tx,
        action: "DELETE",
        module: "USER",
        targetId: id,
        userId: userAuth.userId,
        vataId: userAuth.vataId,
        oldData,
        referenceNumber: oldData.name,
      });

      return result;
    });

    return {
      result,
      message: "ইউজার সফলভাবে মুছে ফেলা হয়েছে।",
    };
  }

  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      await tx.user.update({
        where: {
          id,
        },
        data: {
          deleteStatus: "PENDING",
        },
      });

      return await tx.approvalRequest.create({
        data: {
          action: "DELETE",
          module: "USER",
          targetId: id,
          requestedById: userAuth.userId,
          vataId: userAuth.vataId,
          status: "PENDING",
          oldData,
        },
      });
    },
  );

  return {
    result,
    message: "ইউজার মুছে ফেলার অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে।",
  };
};

// GET LOGIN LOGOUT HISTORY

const getUserLoginHistoryService = async (user: TAuthUser, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const [result, total] = await Promise.all([
    prisma.loginHistory.findMany({
      where: {
        user: {
          vataId: user.vataId,
        },
      },
      include: { user: { select: { name: true } } },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.loginHistory.count({}),
  ]);

  const meta = createMetaConfig({
    limit: limit,
    page: page,
    totalData: total,
  });

  return {
    meta,
    data: result,
  };
};

// GET USER OPTIONS
const getUserOptionService = async (user: TAuthUser) => {
  const result = await prisma.user.findMany({
    where: {
      isDeleted: false,
      vataId: user.vataId,
    },
    select: {
      name: true,
      id: true,
    },
  });

  return result;
};

// UNBLOCK USER FOR LOGIN
const unblockUserForLoginSystemService = async (userId: string) => {
  return await prisma.loginLimit.update({
    where: { userId },
    data: {
      totalTry: 0,
      status: false,
      blockTime: null,
    },
  });
};

export const UserService = {
  createUserServie,
  getAllUsersService,
  getSingleUserService,
  updateUserService,
  deleteUserService,
  getUserLoginHistoryService,
  getUserOptionService,
  unblockUserForLoginSystemService,
};
