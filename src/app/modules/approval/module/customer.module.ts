import { StatusCodes } from "http-status-codes";
import { ApprovalRequest } from "../../../../generated/prisma/client";
import { TAuthUser } from "../../../../interface/token";
import { AppError } from "../../../errors/ApplicationError";
import { prisma } from "../../../../helpers/prisma";
import { CustomerService } from "../../customer/customer.service";

export const customerModule = async (
  user: TAuthUser,
  findRequest: Partial<ApprovalRequest>,
  approvalId: string,
) => {
  if (!findRequest) {
    throw new AppError(StatusCodes.BAD_REQUEST, "অনুমোদনের তথ্য পাওয়া যায়নি।");
  }

  const newData = findRequest.newData as any;
  if (findRequest.action === "UPDATE") {
    const result = await CustomerService.updateCustomerService(
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
      message: "কাস্টমারের তথ্য আপডেটের অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
    };
  }

  throw new AppError(StatusCodes.BAD_REQUEST, "অবৈধ approval action।");
};
