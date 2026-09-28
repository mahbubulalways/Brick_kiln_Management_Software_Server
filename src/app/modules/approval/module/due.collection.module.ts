import { StatusCodes } from "http-status-codes";
import { ApprovalRequest } from "../../../../generated/prisma/client";
import { TAuthUser } from "../../../../interface/token";
import { AppError } from "../../../errors/ApplicationError";
import { DueCollectionService } from "../../due_collection/due_collection.service";
import { prisma } from "../../../../helpers/prisma";

export const dueCollectionModule = async (
  user: TAuthUser,
  findRequest: Partial<ApprovalRequest>,
  approvalId: string,
) => {
  if (findRequest.action === "UPDATE") {
    if (!findRequest) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "আপডেটের জন্য নতুন তথ্য পাওয়া যায়নি।",
      );
    }
    const newData = findRequest.newData;
    const result = await DueCollectionService.updateDueCollectionService(
      user,
      findRequest?.targetId!,
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
      message: "বাকি আপডেটের অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
    };
  }

  if (findRequest.action === "DELETE") {
    const result = await DueCollectionService.deleteDueCollectionService(
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
      message: "বাকি মুছে ফেলার অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
    };
  }
};
