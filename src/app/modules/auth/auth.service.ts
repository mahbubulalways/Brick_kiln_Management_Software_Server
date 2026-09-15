import { StatusCodes } from "http-status-codes";
import { IAuth } from "./auth.interface";
import { Config } from "../../../config";
import { AppError } from "../../errors/ApplicationError";
import { bcryptHelper } from "../../../helpers/bcryptHelper";
import { jwtHelper } from "./auth.utils";
import { prisma } from "../../../helpers/prisma";
import { UserService } from "../user/user.service";
import { TAuthUser } from "../../../interface/token";
import { VataStatus } from "../../../generated/prisma/enums";

const userData = {
  name: "Mahbubul Hasan",
  username: "mahbub",
  role: "ADMIN",
  password: "12345678",
};

const loginUserToSystemService = async (payload: IAuth, ip: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: payload.username,
    },
    include: {
      vata: {
        select: {
          status: true,
        },
      },
    },
  });
  // const u = await UserService.createUserServie(userData)
  // console.log(u)

  // User not found
  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "প্রদত্ত তথ্যের সাথে কোনো অ্যাকাউন্ট পাওয়া যায়নি।",
    );
  }

  if (user.vata?.status !== VataStatus.ACTIVE) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "আপনার ভাটা অ্যাকাউন্টটি বর্তমানে নিষ্ক্রিয় রয়েছে।",
    );
  }

  // Password validation
  const isPasswordMatched = await bcryptHelper.comparePassword(
    payload.password,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "ইউজারনেম অথবা পাসওয়ার্ড সঠিক নয়।",
    );
  }

  // Login history
  await prisma.loginHistory.create({
    data: {
      type: "Login",
      device: payload.extra?.device || "Unknown",
      browser: payload.extra?.browser || "Unknown",
      ipAddress: ip || "Unknown",
      userId: user.id,
    },
  });

  // JWT payload
  const tokenInfo = {
    username: user.username,
    userId: user.id,
    role: user.role,
    vataId: user.vataId,
  };

  // Access token
  const accessToken = await jwtHelper.generateToken(
    tokenInfo,
    Config.ACCESS_TOKEN_SECRET as string,
    "7D",
  );

  // Refresh token
  const refreshToken = await jwtHelper.generateToken(
    tokenInfo,
    Config.REFRESH_TOKEN_SECRET as string,
    "30D",
  );

  return {
    accessToken,
    refreshToken,
  };
};

// LOGOUT

const logoutUserService = async (
  userAuth: TAuthUser,
  username: string,
  ip: string,
  payload: {
    device: string;
    browser: string;
  },
) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
      vataId: userAuth.vataId,
    },
  });

  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "প্রদত্ত তথ্যের সাথে কোনো অ্যাকাউন্ট পাওয়া যায়নি।",
    );
  }

  if (user.role !== "SUPER_ADMIN" && user.role !== "SYSTEM_ADMIN") {
    await prisma.loginHistory.create({
      data: {
        type: "Logout",
        device: payload?.device || "Unknown",
        browser: payload?.browser || "Unknown",
        ipAddress: ip || "Unknown",
        userId: user.id,
      },
    });
  }

  return {
    id: user.id,
  };
};

// CHANGE PASSWORD
const changePasswordServie = async (
  user: TAuthUser,
  payload: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  const mainUser = await prisma.user.findFirst({
    where: {
      username: user.username,
      vataId: user.vataId,
    },
  });

  if (!mainUser) {
    throw new AppError(StatusCodes.NOT_FOUND, "ব্যবহারকারী খুঁজে পাওয়া যায়নি।");
  }

  const matchPassword = await bcryptHelper.comparePassword(
    payload.oldPassword,
    mainUser.password,
  );

  if (!matchPassword) {
    throw new AppError(StatusCodes.BAD_REQUEST, "পুরাতন পাসওয়ার্ড সঠিক নয়।");
  }

  const hashedPassword = await bcryptHelper.hashPassword(payload.newPassword);

  const result = await prisma.user.update({
    where: {
      id: mainUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  return result;
};

export const AuthService = {
  loginUserToSystemService,
  logoutUserService,
  changePasswordServie,
};
