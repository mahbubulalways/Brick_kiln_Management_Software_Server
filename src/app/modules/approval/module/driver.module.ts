import { StatusCodes } from "http-status-codes";
import { ApprovalRequest } from "../../../../generated/prisma/client";
import { TAuthUser } from "../../../../interface/token";
import { AppError } from "../../../errors/ApplicationError";
import { prisma } from "../../../../helpers/prisma";
import { DriverService } from "../../driver/driver.service";

export const driverModule = async (
  user: TAuthUser,
  findRequest: Partial<ApprovalRequest>,
  approvalId: string,
) => {
  if (!findRequest) {
    throw new AppError(StatusCodes.BAD_REQUEST, "অনুমোদনের তথ্য পাওয়া যায়নি।");
  }

  if (findRequest.action === "UPDATE") {
    if (!findRequest.newData) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "আপডেটের জন্য নতুন তথ্য পাওয়া যায়নি।",
      );
    }

    const newData = findRequest.newData as any;

    const result = await DriverService.updateDriverService(
      user,
      findRequest.targetId!,
      newData,
    );

    await prisma.approvalRequest.update({
      where: {
        id: approvalId,
      },
      data: {
        status: "APPROVED",
        reviewedAt: new Date(),
      },
    });

    return {
      result,
      message: "ড্রাইভারের তথ্য আপডেটের অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
    };
  }

  if (findRequest.action === "DELETE") {
    const result = await DriverService.deleteDriverService(
      user,
      findRequest.targetId!,
    );

    await prisma.approvalRequest.update({
      where: {
        id: approvalId,
      },
      data: {
        status: "APPROVED",
        reviewedAt: new Date(),
      },
    });

    return {
      result,
      message: "ড্রাইভার মুছে ফেলার অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
    };
  }

  throw new AppError(StatusCodes.BAD_REQUEST, "অবৈধ approval action।");
};
