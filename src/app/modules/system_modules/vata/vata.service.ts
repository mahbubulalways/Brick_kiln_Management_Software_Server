import { StatusCodes } from "http-status-codes";
import { Prisma } from "../../../../generated/prisma/client";
import { prisma } from "../../../../helpers/prisma";
import { AppError } from "../../../errors/ApplicationError";
import { TAdminVata, TAdminVataUpdate } from "./vata.interface";
import { bcryptHelper } from "../../../../helpers/bcryptHelper";
import { createVataSeasonService } from "../../season/season.service";

// CREATE NEW VATA
const createNewVataService = async (payload: TAdminVata) => {
  const vataInformation = payload.vata;
  const ownerInformation = payload.owner;
  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const existVata = await tx.vata.findFirst({
        where: {
          OR: [
            { vataId: payload.vata.vataId },
            { subdomain: payload.vata.subdomain },
          ],
        },
        select: {
          vataId: true,
          subdomain: true,
        },
      });

      if (existVata) {
        if (existVata.vataId === payload.vata.vataId) {
          throw new AppError(
            StatusCodes.CONFLICT,
            "এই ভাটা আইডি ইতিমধ্যে ব্যবহার করা হয়েছে",
          );
        }

        if (existVata.subdomain === payload.vata.subdomain) {
          throw new AppError(
            StatusCodes.CONFLICT,
            "এই সাবডোমেইন ইতিমধ্যে ব্যবহার করা হয়েছে",
          );
        }
      }
      const existUser = await tx.user.findFirst({
        where: {
          username: payload.owner.username,
        },
        select: {
          id: true,
        },
      });

      if (existUser?.id) {
        throw new AppError(
          StatusCodes.CONFLICT,
          "এই ইউজারনেম ইতিমধ্যে ব্যবহার করা হয়েছে",
        );
      }
      const hashPassword = await bcryptHelper.hashPassword(
        ownerInformation.password,
      );
      const subdomain = vataInformation.nameEnglish.split(" ")[0].toLowerCase();
      const vata = await tx.vata.create({
        data: {
          vataId: vataInformation.vataId,
          nameEnglish: vataInformation.nameEnglish,
          nameBangla: vataInformation.nameBangla,
          address: vataInformation.address,
          shortDescription: vataInformation.shortDescription || null,
          additionalAddress: vataInformation.additionalAddress || null,
          ownerName: vataInformation.ownerName,
          ownerPhoneNumber: vataInformation.ownerPhoneNumber,
          subscriptionPlanId: vataInformation.subscriptionPlanId,
          nextPaymentDate: new Date(vataInformation.nextPaymentDate),
          subdomain: vataInformation.subdomain || subdomain,
          subscriptionEnd: payload.vata.nextPaymentDate,
          subscriptionStart: new Date(),

          challanManagerPhoneNumber: payload?.vata.challanManagerPhoneNumber,
          challanPersonOneName: payload.vata.challanPersonOneName,
          challanPersonOnePhoneNumber: payload.vata.challanPersonOnePhoneNumber,
          challanPersonTwoName: payload.vata.challanPersonTwoPhoneNumber,
          challanPersonTwoPhoneNumber: payload.vata.challanManagerPhoneNumber,
          shortForm: payload?.vata.shortForm,
        },
      });

      const planPrice = await tx.subscriptionPlan.findFirst({
        where: {
          id: vataInformation.subscriptionPlanId,
        },
        select: {
          price: true,
        },
      });
      await tx.subscriptionPayment.create({
        data: {
          amount: planPrice?.price!,
          paymentMethod: "1st",
          phoneNumber: "1st",
          transactionId: "1st",
          startDate: new Date(),
          paidAt: new Date(),
          endDate: payload.vata.nextPaymentDate,
          status: "PAID",
          vataId: vata.id,
          subscriptionPlanId: vata.subscriptionPlanId!,
        },
      });

      await tx.user.create({
        data: {
          password: hashPassword,
          username: ownerInformation.username,
          name: ownerInformation.name,
          role: "OWNER",
          vataId: vata.id,
        },
      });
      return vata;
    },
  );
  await createVataSeasonService(result?.id);
  return result;
};

// GET ALL VATA
const getAllVataService = async () => {
  const result = await prisma.vata.findMany({
    where: {
      status: "ACTIVE",
    },
    select: {
      vataId: true,
      id: true,
      nameBangla: true,
      nameEnglish: true,
      nextPaymentDate: true,
      ownerName: true,
      address: true,
      createdAt: true,
      status: true,
      subscriptionStart: true,
      subscriptionEnd: true,
      subscriptionPlan: {
        select: {
          name: true,
          price: true,
        },
      },
    },
  });
  return result;
};

// GET ALL INACTIVE VATA
const getAllInactiveVataService = async () => {
  const result = await prisma.vata.findMany({
    where: {
      status: {
        not: "ACTIVE",
      },
    },
    select: {
      vataId: true,
      id: true,
      nameBangla: true,
      nameEnglish: true,
      nextPaymentDate: true,
      ownerName: true,
      address: true,
      createdAt: true,
      status: true,
      subscriptionStart: true,
      subscriptionEnd: true,
      subscriptionPlan: {
        select: {
          name: true,
          price: true,
        },
      },
    },
  });
  return result;
};

// GET SINGLE VATA
const getSingleVataService = async (id: string) => {
  const result = await prisma.vata.findFirst({
    where: { id },
    select: {
      vataId: true,
      id: true,
      nameBangla: true,
      nameEnglish: true,
      nextPaymentDate: true,
      ownerName: true,
      address: true,
      createdAt: true,
      subscriptionEnd: true,
      subscriptionStart: true,
      subdomain: true,
      subscriptionPlan: {
        select: {
          name: true,
          price: true,
        },
      },
      subscriptionPayments: {
        select: {
          amount: true,
          createdAt: true,
          endDate: true,
          id: true,
          paidAt: true,
          paymentMethod: true,
          phoneNumber: true,
          startDate: true,
          status: true,
          transactionId: true,
        },
      },
      ownerPhoneNumber: true,
    },
  });
  return result;
};

// GETB SINGLE VATA INFO FOR UPDATE
const getSingleVataInformationService = async (id: string) => {
  const result = await prisma.vata.findFirst({
    where: {
      id,
    },
    select: {
      address: true,
      nameBangla: true,
      nameEnglish: true,
      ownerName: true,
      challansPhoneNumber: true,
      ownerPhoneNumber: true,
      subdomain: true,
      shortDescription: true,
      additionalAddress: true,
    },
  });
  return result;
};

// UPDATE VATA INFO
const updateVataInfoService = async (id: string, info: TAdminVataUpdate) => {
  const updateData = {
    nameBangla: info.nameBangla,
    nameEnglish: info.nameEnglish,
    ownerName: info.ownerName,
    ownerPhoneNumber: info.ownerPhoneNumber,
    challansPhoneNumber: info.challansPhoneNumber,
    address: info.address,
    subdomain: info.subdomain,
  };

  const result = await prisma.vata.update({
    where: {
      id,
    },
    data: updateData,
  });

  return result;
};

// UPDATE VATA SUBSCRIPTION
const updateVataSubscriptionService = async (
  id: string,
  payload: { subscriptionPlanId: string },
) => {
  return await prisma.$transaction(async (tx) => {
    // Find subscription plan
    const findsubscription = await tx.subscriptionPlan.findFirst({
      where: {
        id: payload.subscriptionPlanId,
      },
      select: {
        price: true,
        billingCycle: true,
      },
    });

    // Subscription plan not found
    if (!findsubscription) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "নির্বাচিত সাবস্ক্রিপশন প্ল্যানটি পাওয়া যায়নি।",
      );
    }

    // Start date
    const startDate = new Date();

    // Calculate end date
    const endDate = new Date(startDate);

    if (findsubscription.billingCycle === "MONTHLY") {
      // 1 month later
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (findsubscription.billingCycle === "YEARLY") {
      // 1 year later
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "সাবস্ক্রিপশনের বিলিং সাইকেল সঠিক নয়।",
      );
    }
    const vataUpdate = await tx.vata.update({
      where: {
        id,
      },
      data: {
        subscriptionPlanId: payload.subscriptionPlanId,
        subscriptionStart: startDate,
        subscriptionEnd: endDate,
        nextPaymentDate: endDate,
      },
    });

    await tx.subscriptionPayment.create({
      data: {
        amount: findsubscription.price,
        paymentMethod: "Update",
        phoneNumber: "Update",
        transactionId: "Update",
        startDate,
        endDate,
        paidAt: new Date(),
        status: "PAID",
        subscriptionPlanId: payload.subscriptionPlanId,
        vataId: id,
      },
    });

    return vataUpdate;
  });
};

export const AdminVataService = {
  createNewVataService,
  getAllVataService,
  getSingleVataService,
  getAllInactiveVataService,
  getSingleVataInformationService,
  updateVataInfoService,
  updateVataSubscriptionService,
};
