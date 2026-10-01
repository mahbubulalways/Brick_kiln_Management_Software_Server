import { StatusCodes } from "http-status-codes";
import { ApprovalRequest } from "../../../../generated/prisma/client";
import { TAuthUser } from "../../../../interface/token";
import { AppError } from "../../../errors/ApplicationError";
import { prisma } from "../../../../helpers/prisma";
import { StockBookService } from "../../stock_book/stock_book.service";

export const stockModule = async (
  user: TAuthUser,
  findRequest: Partial<ApprovalRequest>,
  approvalId: string,
) => {
  if (!findRequest) {
    throw new AppError(StatusCodes.BAD_REQUEST, "অনুমোদনের তথ্য পাওয়া যায়নি।");
  }

  if (findRequest.action === "DELETE") {
    const result = await StockBookService.deleteStockService(
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
      message: "স্টকের তথ্য মুছে ফেলার অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
    };
  }

  throw new AppError(StatusCodes.BAD_REQUEST, "অবৈধ approval action।");
};
