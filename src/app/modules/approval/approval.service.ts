import { StatusCodes } from "http-status-codes";
import { ClassAndRate, Prisma } from "../../../generated/prisma/client";
import { ApprovalStatus } from "../../../generated/prisma/enums";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { TAuthUser } from "../../../interface/token";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { AppError } from "../../errors/ApplicationError";
import { ClassAndRateService } from "../classAndRate/classAndRateRoute.service";
import { generateActivityDescription } from "./approval.utils";
import { ActivityService } from "../activity/activity.service";

const getAlApprovalService = async (user: TAuthUser, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const [result, total] = await Promise.all([
    prisma.approvalRequest.findMany({
      where: { vataId: user.vataId, isDeleted: false },
      include: {
        requestedBy: {
          select: {
            name: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.approvalRequest.count({
      where: { vataId: user.vataId, isDeleted: false },
    }),
  ]);

  const meta = createMetaConfig({
    limit: limit,
    page: page,
    totalData: total,
  });

  return {
    meta,
    data: result,
  };
};

const changeAprovalStatus = async (
  user: TAuthUser,
  approvalId: string,
  status: ApprovalStatus,
) => {
  const findRequest = await prisma.approvalRequest.findFirst({
    where: {
      id: approvalId,
      vataId: user.vataId,
      isDeleted: false,
      status: "PENDING",
    },
    select: {
      id: true,
      module: true,
      action: true,
      targetId: true,
      newData: true,
      oldData: true,
      vataId: true,
    },
  });

  if (!findRequest) {
    throw new AppError(StatusCodes.NOT_FOUND, "অনুমোদনের অনুরোধ পাওয়া যায়নি।");
  }

  // if (status === "CANCELLED") {
  //   const result = await prisma.approvalRequest.update({
  //     where: {
  //       id: approvalId,
  //     },
  //     data: {
  //       status: "CANCELLED",
  //       reviewedAt: new Date(),
  //     },
  //   });

  //   return {
  //     result,
  //     message: "অনুমোদনের অনুরোধ সফলভাবে বাতিল করা হয়েছে।",
  //   };
  // }

  if (status !== "APPROVED") {
    throw new AppError(StatusCodes.BAD_REQUEST, "অনুমোদনের স্ট্যাটাস সঠিক নয়।");
  }

  //============================ APPROVED STATUS =================

  // ===========================CLASS AND RATE ===================================

  if (findRequest.module === "CLASS_RATE") {
    if (findRequest.action === "UPDATE") {
      if (!findRequest.newData) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          "আপডেটের জন্য নতুন তথ্য পাওয়া যায়নি।",
        );
      }
      const newData = findRequest.newData;
      const result = await ClassAndRateService.updateClassAndRateService(
        user,
        findRequest?.targetId,
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
        message: "শ্রেণী ও রেট আপডেটের অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
      };
    }

    if (findRequest.action === "DELETE") {
      const result = await ClassAndRateService.deleteClassAndRateService(
        user,
        findRequest.targetId,
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
        message: "শ্রেণী ও রেট মুছে ফেলার অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
      };
    }
  }

  // ==================== CHALLAN ================================

  if (findRequest.module === "CHALLAN") {
    if (findRequest.action === "UPDATE") {
      // Challan update approval
    }

    if (findRequest.action === "DELETE") {
      // Challan delete approval
    }
  }

  // =========================== DELIVERY============================

  if (findRequest.module === "DELIVERY") {
    if (findRequest.action === "UPDATE") {
      // Delivery update approval
    }

    if (findRequest.action === "DELETE") {
      // Delivery delete approval
    }
  }

  throw new AppError(
    StatusCodes.BAD_REQUEST,
    "এই অনুমোদনের অনুরোধের জন্য কোনো কার্যক্রম নির্ধারিত নেই।",
  );
};

export const ApprovalService = {
  getAlApprovalService,
  changeAprovalStatus,
};
