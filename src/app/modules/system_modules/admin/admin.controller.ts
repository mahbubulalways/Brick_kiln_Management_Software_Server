import { AdminService } from "./admin.service";
import catchAsync from "../../../../utils/catchAsync";
import { sendResponse } from "../../../../utils/sendResponse";
import { AppError } from "../../../errors/ApplicationError";
import { StatusCodes } from "http-status-codes";

const createAdminController = catchAsync(async (req, res) => {
    const data = {
        name: "System Admin",
        username: "systemadmin",
        password: "12345678"
    }
    const result = await AdminService.createSuperAdminService(data);
    if (result) {
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "অ্যাডমিন সফলভাবে তৈরি হয়েছে",
        });
    } else {
          throw new AppError(StatusCodes.BAD_REQUEST, "অ্যাডমিন তৈরি করা যায়নি")
    }
});

export const AdminController = {
    createAdminController,
};