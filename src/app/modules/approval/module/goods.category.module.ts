import { StatusCodes } from "http-status-codes";

import { ApprovalRequest } from "../../../../generated/prisma/client";
import { TAuthUser } from "../../../../interface/token";
import { AppError } from "../../../errors/ApplicationError";
import { prisma } from "../../../../helpers/prisma";
import { GoodsCategoryService } from "../../goods_category/goods_category.service";

export const goodsStockCategoryModule = async (
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

    const result = await GoodsCategoryService.updateGoodCategoryService(
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
      message: "পণ্যের ক্যাটাগরি আপডেটের অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
    };
  }

  if (findRequest.action === "DELETE") {
    const result = await GoodsCategoryService.deleteGoodCategoryService(
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
      message: "পণ্যের ক্যাটাগরি মুছে ফেলার অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
    };
  }
};
