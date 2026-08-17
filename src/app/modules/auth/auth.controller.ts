import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { AppError } from "../../errors/ApplicationError";
import { sendResponse } from "../../../utils/sendResponse";

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

export const AuthController = { loginUserToSystemController };
