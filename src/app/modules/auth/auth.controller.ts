import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { AppError } from "../../errors/ApplicationError";
import { sendResponse } from "../../../utils/sendResponse";

const loginUserToSystemController = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await AuthService.loginUserToSystemService(body);
  if (!result.accessToken) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to login. Please try again later.",
    );
  } else {
    res.cookie("token", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    sendResponse(res, {
      message: "Login successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: { token: result.accessToken },
    });
  }
});

export const AuthController = { loginUserToSystemController };
