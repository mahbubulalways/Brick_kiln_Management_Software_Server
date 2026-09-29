import { StatusCodes } from "http-status-codes";
import { ApprovalRequest } from "../../../../generated/prisma/client";
import { TAuthUser } from "../../../../interface/token";
import { AppError } from "../../../errors/ApplicationError";
import { LedgerService } from "../../ledger/ledger..service";
import { prisma } from "../../../../helpers/prisma";
import { getMovementTypeEnglish } from "../../load/load.type";
import { LoadInfoService } from "../../load/load.service";

type TNewLoad = {
  date: string;
  loadType: string;
  quantity: number;
  round: string;
};

export const loadModule = async (
  user: TAuthUser,
  seasonId: string,
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

    const newData = findRequest.newData as TNewLoad;
    const findRound = await prisma.round.findFirst({
      where: { name: newData?.round },
      select: { id: true },
    });

    const formatData = {
      date: newData.date,
      loadType: getMovementTypeEnglish(newData.loadType),
      roundId: findRound?.id,
      quantity: Number(newData?.quantity),
    };

    const result = await LoadInfoService.updateLoadInfoService(
      user,
      seasonId,
      findRequest?.targetId!,
      formatData as any,
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
      message: "ইটের লোড আপডেটের অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
    };
  }

  if (findRequest.action === "DELETE") {
    const result = await LoadInfoService.deleteLoadInfoService(
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
      message: "ইটের লোড মুছে ফেলার অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
    };
  }
};
