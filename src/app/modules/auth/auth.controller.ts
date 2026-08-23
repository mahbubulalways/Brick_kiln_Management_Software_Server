import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { AppError } from "../../errors/ApplicationError";
import { sendResponse } from "../../../utils/sendResponse";
import { TAuthUser } from "../../../interface/token";

const loginUserToSystemController = catchAsync(async (req, res) => {
  const body = req.body;
  const ipAddress = req.ip as string;

  const result = await AuthService.loginUserToSystemService(
    body,
    ipAddress,
  );

  if (!result?.accessToken) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "লগইন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।",
    );
  } else {
    res.cookie("token", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    sendResponse(res, {
      message: "লগইন সফল হয়েছে।",
      statusCode: StatusCodes.OK,
      success: true,
      data: {
        token: result.accessToken,
      },
    });
  }
});


const logoutController = catchAsync(async (req, res) => {
  const body = req.body
  const ipAddress = req.ip as string;
  const username = req.user.username
  const user = req.user as TAuthUser
  const result = await AuthService.logoutUserService(user, username, ipAddress, body)
  if (!result?.id) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "লগআউট করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    );
  }
  // Clear authentication cookies
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "আপনি সফলভাবে লগআউট করেছেন।",
  });
});


// CHANGE PASS

const changePasswordController = catchAsync(async (req, res) => {
  const body = req.body;
  const user = req.user as TAuthUser;
  const result = await AuthService.changePasswordServie(user, body);
  if (!result?.id) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "পাসওয়ার্ড পরিবর্তন করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    );
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "আপনার পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।",
  });
});

export const AuthController = {
  loginUserToSystemController,
  logoutController,
  changePasswordController
};
