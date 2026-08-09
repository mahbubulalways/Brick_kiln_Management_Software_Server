import { StatusCodes } from "http-status-codes";
import { IAuth } from "./auth.interface";
import { Config } from "../../../config";
import { AppError } from "../../errors/ApplicationError";
import { bcryptHelper } from "../../../helpers/bcryptHelper";
import { jwtHelper } from "./auth.utils";
import { prisma } from "../../../helpers/prisma";

const loginUserToSystemService = async (payload: IAuth) => {
  // const res = await prisma.user.create({
  //   data: { email: "admin@gmail.com", password: "12345678" },
  // });

  const user = await prisma.user.findFirst({
    where: { email: payload.email },
  });
  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "No account found with the provided credentials.",
    );
  }
  // const matchPassword = await bcryptHelper.comparePassword(
  //   payload.password,
  //   user?.password,
  // );

  const matchPassword = payload.password === user?.password;
  if (!matchPassword) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "No account found with the provided credentials.",
    );
  }

  const tokenInfo = {
    email: user.email,
    userId: user.id,
  };

  const accessToken = await jwtHelper.generateToken(
    tokenInfo,
    Config.ACCESS_TOKEN_SECRET as string,
    "5D",
  );
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

export const AuthService = { loginUserToSystemService };
