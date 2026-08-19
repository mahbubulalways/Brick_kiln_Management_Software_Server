import { StatusCodes } from "http-status-codes";
import { IAuth } from "./auth.interface";
import { Config } from "../../../config";
import { AppError } from "../../errors/ApplicationError";
import { bcryptHelper } from "../../../helpers/bcryptHelper";
import { jwtHelper } from "./auth.utils";
import { prisma } from "../../../helpers/prisma";
import { UserService } from "../user/user.service";

const userData = {
  name: "Mahbubul Hasan",
  username: "mahbub",
  role: "ADMIN",
  password: "12345678",
};

const loginUserToSystemService = async (
  payload: IAuth,
  ip: string,
) => {
  const user = await prisma.user.findUnique({
    where: {
      username: payload.username,
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
  };

  // Access token
  const accessToken = await jwtHelper.generateToken(
    tokenInfo,
    Config.ACCESS_TOKEN_SECRET as string,
    "5D",
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

const logoutUserService = async (username: string, ip: string, payload: { device: string, browser: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "প্রদত্ত তথ্যের সাথে কোনো অ্যাকাউন্ট পাওয়া যায়নি।",
    );
  }

  const result = await prisma.loginHistory.create({
    data: {
      type: "Logout",
      device: payload?.device || "Unknown",
      browser: payload?.browser || "Unknown",
      ipAddress: ip || "Unknown",
      userId: user.id,
    },
  });
  return result
}

export const AuthService = { loginUserToSystemService, logoutUserService };
