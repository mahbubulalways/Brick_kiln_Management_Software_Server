import { SmsStatus } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";
import { TAuthUser } from "../../../interface/token";
import { sendSmsToPhoneNumbers } from "../../service/smsService";

type TSmsSend = {
  user: TAuthUser;
  sendToOwner?: boolean;
  clientPhoneNumber: string;
  from:
    | "NEW_INVOICE"
    | "UPDATE_INVOICE"
    | "DELETE_INVOICE"
    | "NEW_DELIVERY"
    | "DEU_COLLECTION"
    | "UPDATE_DEU_COLLECTION";
  message: string;
};

export const getUserAndPermissionForSms = async ({
  clientPhoneNumber,
  message,
  sendToOwner,
  user,
  from,
}: TSmsSend) => {
  const [userInfo, vataOwner, smsPermission, smsWallet] = await Promise.all([
    prisma.user.findFirst({
      where: {
        username: user.username,
      },
      select: {
        username: true,
      },
    }),

    prisma.user.findFirst({
      where: {
        vataId: user.vataId,
        role: "OWNER",
      },
      select: {
        vata: {
          select: {
            ownerPhoneNumber: true,
          },
        },
      },
    }),

    prisma.vataSmsSettings.findFirst({
      where: {
        vataId: user.vataId,
      },
      select: {
        deleteInvoice: true,
        deuCollectionUpdate: true,
        newDelivery: true,
        newDueCollection: true,
        newInvoice: true,
        updateInvoice: true,
      },
    }),

    prisma.smsWallet.findFirst({
      where: {
        vataId: user.vataId,
      },
    }),
  ]);

  const permissionMap: Record<TSmsSend["from"], boolean> = {
    NEW_INVOICE: Boolean(smsPermission?.newInvoice),
    UPDATE_INVOICE: Boolean(smsPermission?.updateInvoice),
    DELETE_INVOICE: Boolean(smsPermission?.deleteInvoice),
    NEW_DELIVERY: Boolean(smsPermission?.newDelivery),
    DEU_COLLECTION: Boolean(smsPermission?.newDueCollection),
    UPDATE_DEU_COLLECTION: Boolean(smsPermission?.deuCollectionUpdate),
  };

  if (!permissionMap[from] || !smsWallet || !message) {
    return;
  }

  const smsRate = Number(smsWallet.currentRate ?? 0);

  const ownerPhoneNumber = vataOwner?.vata?.ownerPhoneNumber;

  const phoneNumbers: string[] = [];

  if (clientPhoneNumber) {
    phoneNumbers.push(clientPhoneNumber);
  }

  if (sendToOwner && ownerPhoneNumber) {
    phoneNumbers.push(ownerPhoneNumber);
  }

  if (!phoneNumbers.length) {
    return;
  }

  const totalSms = phoneNumbers.length;

  const currentBalance =
    Number(smsWallet.totalPurchased) - Number(smsWallet.totalUsed);

  if (currentBalance < totalSms) {
    return;
  }

  const response = await sendSmsToPhoneNumbers(phoneNumbers, message);

  console.log(response?.data);

  if (!response) {
    await prisma.smsLog.createMany({
      data: phoneNumbers.map((phoneNumber) => ({
        message,
        cost: 0,
        phoneNumber,
        sendBy: userInfo?.username ?? user.username,
        status: SmsStatus.FAILED,
        vataId: user.vataId,
      })),
    });

    return;
  }

  await prisma.smsLog.createMany({
    data: phoneNumbers.map((phoneNumber) => ({
      message,
      cost: smsRate,
      phoneNumber,
      sendBy: userInfo?.username ?? user.username,
      status: SmsStatus.SENT,
      vataId: user.vataId,
    })),
  });

  await prisma.smsWallet.update({
    where: {
      vataId: user.vataId,
    },
    data: {
      totalUsed: {
        increment: totalSms,
      },
      balance: {
        decrement: totalSms * smsRate,
      },
    },
  });
};
