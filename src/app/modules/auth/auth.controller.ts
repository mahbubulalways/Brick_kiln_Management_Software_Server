import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { AppError } from "../../errors/ApplicationError";
import { sendResponse } from "../../../utils/sendResponse";
import { TAuthUser } from "../../../interface/token";

const loginUserToSystemController = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await AuthService.loginUserToSystemService(body);

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
  const body = req.body;
  const user = req.user as TAuthUser;
  const result = await AuthService.logoutUserService(user, body);

  if (!result?.id) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "লগআউট করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    );
  }

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

// FORGOT PASS
const forgotPasswordController = catchAsync(async (req, res) => {
  const result = await AuthService.forgotPasswordService(req.body.email);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "রিকভারি কোড পাঠানো যায়নি");
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "আপনার ইমেইলে পাসওয়ার্ড পুনরুদ্ধার কোড পাঠানো হয়েছে",
    });
  }
});

// Resend Recovery Code Controller
const resendRecoveryCodeController = catchAsync(async (req, res) => {
  const result = await AuthService.resendRecoveryCodeService(req.body.email);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "নতুন কোড পাঠানো যায়নি");
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "নতুন পুনরুদ্ধার কোড আপনার ইমেইলে পাঠানো হয়েছে",
    });
  }
});

// Verify Recovery Code Controller
const verifyRecoveryCodeController = catchAsync(async (req, res) => {
  const result = await AuthService.verifyRecoveryCodeService(
    req.body.email,
    req.body.recoveryCode,
  );
  if (!result.verified) {
    throw new AppError(StatusCodes.BAD_REQUEST, "ভেরিফিকেশন ব্যর্থ হয়েছে");
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "ভেরিফিকেশন সফল হয়েছে",
    });
  }
});

// RESET PASSWORD
const resetPasswordController = catchAsync(async (req, res) => {
  const result = await AuthService.resetPasswordService(req.body);

  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "পাসওয়ার্ড পরিবর্তন করা যায়নি।",
    );
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।",
  });
});

export const AuthController = {
  loginUserToSystemController,
  logoutController,
  changePasswordController,
  forgotPasswordController,
  resendRecoveryCodeController,
  verifyRecoveryCodeController,
  resetPasswordController,
};
