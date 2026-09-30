import { StatusCodes } from "http-status-codes";
import { Prisma } from "../../../generated/prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { TAuthUser } from "../../../interface/token";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { AppError } from "../../errors/ApplicationError";
import { ActivityService } from "../activity/activity.service";

const createContactService = async (
  user: TAuthUser,
  payload: {
    name: string;
    address: string;
    occupation: string;
    phone: string;
  },
) => {
  const result = await prisma.contact.create({
    data: {
      name: payload.name,
      address: payload.address,
      occupation: payload.occupation,
      phone: payload.phone,
      vataId: user.vataId,
    },
  });

  return result;
};

const getAllContactService = async (user: TAuthUser, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where: Prisma.ContactWhereInput = { vataId: user.vataId };
  if (query.search?.trim()) {
    const search = query.search.trim();
    where.OR = [
      {
        address: {
          contains: search,
          mode: "insensitive",
        },
      },

      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        phone: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  const [result, total] = await Promise.all([
    prisma.contact.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    }),
    prisma.contact.count({ where }),
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

const getSingleContactService = async (user: TAuthUser, id: string) => {
  const result = await prisma.contact.findUnique({
    where: {
      id,
      vataId: user.vataId,
    },
  });
  return result;
};
const updateContactService = async (
  user: TAuthUser,
  id: string,
  payload: {
    name?: string;
    address?: string;
    occupation?: string;
    phone?: string;
  },
) => {
  const oldContact = await prisma.contact.findFirst({
    where: {
      id,
      vataId: user.vataId,
    },
  });

  if (!oldContact) {
    throw new AppError(StatusCodes.NOT_FOUND, "কন্টাক্টের তথ্য পাওয়া যায়নি।");
  }

  const oldData = {
    name: oldContact.name,
    address: oldContact.address,
    occupation: oldContact.occupation,
    phone: oldContact.phone,
  };

  const newData = {
    name: payload.name ?? oldContact.name,
    address: payload.address ?? oldContact.address,
    occupation: payload.occupation ?? oldContact.occupation,
    phone: payload.phone ?? oldContact.phone,
  };

  if (user.role === "ADMIN" || user.role === "OWNER") {
    const result = await prisma.$transaction(async (tx) => {
      const result = await tx.contact.update({
        where: {
          id,
        },
        data: {
          ...payload,
          updateStatus: "APPROVED",
        },
      });

      await ActivityService.createActivityService({
        action: "UPDATE",
        module: "CONTACT",
        targetId: id,
        userId: user.userId,
        vataId: user.vataId,
        oldData,
        newData,
        referenceNumber: oldData.name,
      });

      return result;
    });

    return {
      result,
      message: "কন্টাক্টের তথ্য সফলভাবে আপডেট করা হয়েছে।",
    };
  }

  await prisma.contact.update({
    where: {
      id,
    },
    data: {
      updateStatus: "PENDING",
    },
  });

  const result = await prisma.approvalRequest.create({
    data: {
      action: "UPDATE",
      module: "CONTACT",
      targetId: id,
      requestedById: user.userId,
      vataId: user.vataId,
      status: "PENDING",
      oldData,
      newData,
    },
  });

  return {
    result,
    message: "কন্টাক্টের তথ্য আপডেটের অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে।",
  };
};

//
const deleteContactService = async (user: TAuthUser, id: string) => {
  const oldContact = await prisma.contact.findFirst({
    where: {
      id,
      vataId: user.vataId,
    },
  });

  if (!oldContact) {
    throw new AppError(StatusCodes.NOT_FOUND, "কন্টাক্টের তথ্য পাওয়া যায়নি।");
  }

  const oldData = {
    name: oldContact.name,
    address: oldContact.address,
    occupation: oldContact.occupation,
    phone: oldContact.phone,
  };

  if (user.role === "ADMIN" || user.role === "OWNER") {
    const result = await prisma.$transaction(async (tx) => {
      const result = await tx.contact.delete({
        where: {
          id,
        },
      });

      await ActivityService.createActivityService({
        action: "DELETE",
        module: "CONTACT",
        targetId: id,
        userId: user.userId,
        vataId: user.vataId,
        oldData,
      });
      return result;
    });

    return {
      result,
      message: "কন্টাক্টের তথ্য সফলভাবে মুছে ফেলা হয়েছে।",
    };
  }

  await prisma.contact.update({
    where: {
      id,
    },
    data: {
      deleteStatus: "PENDING",
    },
  });

  const result = await prisma.approvalRequest.create({
    data: {
      action: "DELETE",
      module: "CONTACT",
      targetId: id,
      requestedById: user.userId,
      vataId: user.vataId,
      status: "PENDING",
      oldData,
    },
  });

  return {
    result,
    message: "কন্টাক্টের তথ্য মুছে ফেলার অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে।",
  };
};

export const ContactService = {
  createContactService,
  getAllContactService,
  getSingleContactService,
  updateContactService,
  deleteContactService,
};
