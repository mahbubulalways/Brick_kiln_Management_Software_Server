import { StatusCodes } from "http-status-codes";
import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";
import { AppError } from "../../errors/ApplicationError";
import { TVata } from "./vata.interface";
import { bcryptHelper } from "../../../helpers/bcryptHelper";
import { TAuthUser } from "../../../interface/token";

// CHECK SUB DOMAIN EXIST OR NOT
const checkSubdomainExistService = async (subdomain: string) => {
  const result = await prisma.vata.findFirst({
    where: { subdomain: subdomain },
  });
  return result;
};

// GET VATA INFO
const getVataInformationService = async (user: TAuthUser) => {
  const result = await prisma.vata.findFirst({
    where: { id: user.vataId },
    select: {
      nameBangla: true,
      address: true,
      id: true,
      ownerName: true,
      ownerPhoneNumber: true,
      challanManagerPhoneNumber: true,
      challanPersonOneName: true,
      challanPersonOnePhoneNumber: true,
      additionalAddress: true,
      challanPersonTwoName: true,
      challanPersonTwoPhoneNumber: true,
      shortDescription: true,
      shortForm: true,
    },
  });
  return result;
};

// GET VATA INFO
const getMyVataInformationService = async (user: TAuthUser) => {
  const result = await prisma.vata.findFirst({
    where: { id: user.vataId },
    select: {
      address: true,
      ownerName: true,
      vataId: true,
      challanManagerPhoneNumber: true,
      challanPersonOneName: true,
      challanPersonOnePhoneNumber: true,
      additionalAddress: true,
      challanPersonTwoName: true,
      challanPersonTwoPhoneNumber: true,
      shortDescription: true,
      shortForm: true,

      ownerPhoneNumber: true,
      nameBangla: true,
      nameEnglish: true,
      nextPaymentDate: true,
      subscriptionPlan: {
        select: {
          name: true,
          billingCycle: true,
          price: true,
        },
      },
    },
  });
  return result;
};

// GET MY NAVBAR
const getMyVataNavbarFeaturesService = async (user: TAuthUser) => {
  const result = await prisma.vata.findFirst({
    where: {
      id: user.vataId,
    },
    select: {
      id: true,
      subscriptionPlan: {
        select: {
          features: true,
        },
      },
    },
  });

  return result;
};

// CHECK VATA EXPIRITY
const getVataExpirityService = async (user: TAuthUser) => {
  const result = await prisma.vata.findFirst({
    where: {
      id: user.vataId,
    },
    select: {
      subscriptionEnd: true,
    },
  });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "ভাটা পাওয়া যায়নি");
  }

  if (!result.subscriptionEnd) {
    return {
      isExpired: true,
    };
  }

  const isExpired = new Date(result.subscriptionEnd).getTime() < Date.now();

  return {
    isExpired,
  };
};

export const VataService = {
  checkSubdomainExistService,
  getVataInformationService,
  getMyVataInformationService,
  getMyVataNavbarFeaturesService,
  getVataExpirityService,
};
