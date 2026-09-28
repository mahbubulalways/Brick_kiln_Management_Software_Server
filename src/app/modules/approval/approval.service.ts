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
import { LedgerService } from "../ledger/ledger..service";
import { InvoiceService } from "../challan/challan.service";
import { PaymentService } from "../payment/payment.service";
import { paymentModule } from "./module/payment.module";
import { ledgerModule } from "./module/ledger.module";
import { classRateModule } from "./module/class.rate.module";
import { challanModule } from "./module/challan.module";
import { deliveryModule } from "./module/delivery.module";
import { dueCollectionModule } from "./module/due.collection.module";
import { cashModule } from "./module/cash.module";

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

  if (status !== "APPROVED") {
    throw new AppError(StatusCodes.BAD_REQUEST, "অনুমোদনের স্ট্যাটাস সঠিক নয়।");
  }

  switch (findRequest.module) {
    case "CLASS_RATE":
      return await classRateModule(user, findRequest, approvalId); //done

    case "LEDGER":
      return await ledgerModule(user, findRequest, approvalId); //done

    case "CHALLAN":
      return await challanModule(user, findRequest, approvalId); //done

    case "DELIVERY":
      return await deliveryModule(user, findRequest, approvalId); //done delete

    case "PAYMENT":
      return await paymentModule(user, findRequest, approvalId); //done

    case "DUE":
      return await dueCollectionModule(user, findRequest, approvalId); //done

    case "CASH":
      return await cashModule(user, findRequest, approvalId); //done

    default:
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "এই অনুমোদনের অনুরোধের জন্য কোনো কার্যক্রম নির্ধারিত নেই।",
      );
  }
};
export const ApprovalService = {
  getAlApprovalService,
  changeAprovalStatus,
};

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
