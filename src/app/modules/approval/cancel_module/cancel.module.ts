import { ApprovalRequest } from "../../../../generated/prisma/client";
import { prisma } from "../../../../helpers/prisma";
import { TAuthUser } from "../../../../interface/token";

export const cancelModule = async (
  user: TAuthUser,
  findRequest: Partial<ApprovalRequest>,
) => {
  switch (findRequest.module) {
    case "CLASS_RATE":
      await prisma.classAndRate.update({
        data: {
          updateStatus: "CANCELLED",
        },
        where: {
          vataId: user.vataId,
          id: findRequest.targetId!,
        },
      });

      return {
        message: "শ্রেণি ও রেট আপডেটের অনুরোধ বাতিল করা হয়েছে।",
      };

    case "CHALLAN":
      await prisma.challan.update({
        data: {
          updateStatus: "CANCELLED",
        },
        where: {
          vataId: user.vataId,
          id: findRequest.targetId!,
        },
      });

      return {
        message: "চালান আপডেটের অনুরোধ বাতিল করা হয়েছে।",
      };

    case "DELIVERY":
      await prisma.delivery.update({
        data: {
          updateStatus: "CANCELLED",
        },
        where: {
          invoice: {
            vataId: user.vataId,
          },
          id: findRequest.targetId!,
        },
      });

      return {
        message: "ডেলিভারি আপডেটের অনুরোধ বাতিল করা হয়েছে।",
      };

    case "LEDGER":
      await prisma.ledger.update({
        data: {
          updateStatus: "CANCELLED",
        },
        where: {
          vataId: user.vataId,
          id: findRequest.targetId!,
        },
      });

      return {
        message: "লেজার আপডেটের অনুরোধ বাতিল করা হয়েছে।",
      };

    case "CASH":
      await prisma.ledger.update({
        data: {
          updateStatus: "CANCELLED",
        },
        where: {
          vataId: user.vataId,
          id: findRequest.targetId!,
        },
      });

      return {
        message: "ক্যাশ আপডেটের অনুরোধ বাতিল করা হয়েছে।",
      };

    case "DUE":
      await prisma.due_Collection.update({
        data: {
          updateStatus: "CANCELLED",
        },
        where: {
          customer: {
            vataId: user.vataId,
          },
          id: findRequest.targetId!,
        },
      });

      return {
        message: "বাকি জমার আপডেটের অনুরোধ বাতিল করা হয়েছে।",
      };

    case "PAYMENT":
      await prisma.due_Collection.update({
        data: {
          updateStatus: "CANCELLED",
        },
        where: {
          customer: {
            vataId: user.vataId,
          },
          id: findRequest.targetId!,
        },
      });

      return {
        message: "বাকি পরিশোধের আপডেটের অনুরোধ বাতিল করা হয়েছে।",
      };

    case "LOAD_INFO":
      await prisma.loadInfo.update({
        data: {
          updateStatus: "CANCELLED",
        },
        where: {
          id: findRequest.targetId!,
          round: {
            vataId: user.vataId,
          },
        },
      });

      return {
        message: "ইটের লোড আপডেটের অনুরোধ বাতিল করা হয়েছে।",
      };

    case "GOODS_STOCK_CATEGORY":
      await prisma.goodsStockCategory.update({
        data: {
          updateStatus: "CANCELLED",
        },
        where: {
          vataId: user.vataId,
          id: findRequest.targetId!,
        },
      });

      return {
        message: "পণ্যের ক্যাটাগরি আপডেটের অনুরোধ বাতিল করা হয়েছে।",
      };

    case "CONTACT":
      await prisma.contact.update({
        data: {
          updateStatus: "CANCELLED",
        },
        where: {
          vataId: user.vataId,
          id: findRequest.targetId!,
        },
      });

      return {
        message: "ফোন নম্বর আপডেটের অনুরোধ বাতিল করা হয়েছে।",
      };

    case "DRIVER":
      await prisma.driver.update({
        data: {
          updateStatus: "CANCELLED",
        },
        where: {
          vataId: user.vataId,
          id: findRequest.targetId!,
        },
      });

      return {
        message: "ড্রাইভার আপডেটের অনুরোধ বাতিল করা হয়েছে।",
      };

    case "CAR_RENT":
      await prisma.carRent.update({
        data: {
          updateStatus: "CANCELLED",
        },
        where: {
          vataId: user.vataId,
          id: findRequest.targetId!,
        },
      });

      return {
        message: "ড্রাইভার আপডেটের অনুরোধ বাতিল করা হয়েছে।",
      };

    default:
      return {
        message: "এই মডিউলের জন্য বাতিল করার ব্যবস্থা নেই।",
      };
  }
};
