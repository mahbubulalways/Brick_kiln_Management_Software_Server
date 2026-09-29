import { StatusCodes } from "http-status-codes";
import { ApprovalRequest } from "../../../../generated/prisma/client";
import { TAuthUser } from "../../../../interface/token";
import { AppError } from "../../../errors/ApplicationError";
import { prisma } from "../../../../helpers/prisma";
import { CarRentService } from "../../car_rent/car_rent.service";

export const carRentModule = async (
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

    const newData = findRequest.newData;

    const result = await CarRentService.updateCarRentService(
      user,
      findRequest.targetId!,
      newData as any,
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
      message: "গাড়ি ভাড়ার তথ্য আপডেটের অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
    };
  }

  if (findRequest.action === "DELETE") {
    const result = await CarRentService.deleteCarRentService(
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
      message:
        "গাড়ি ভাড়ার তথ্য মুছে ফেলার অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
    };
  }

  throw new AppError(StatusCodes.BAD_REQUEST, "অবৈধ approval action।");
};
