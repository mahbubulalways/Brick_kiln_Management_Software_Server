import { Prisma, SmsStatus } from "../../../generated/prisma/client";

import { TAuthUser } from "../../../interface/token";

import { sendSmsToPhoneNumbers } from "../../../utils/sendSmsToPhoneNumbers";

type TSmsSend = {
  user: TAuthUser;

  tx: Prisma.TransactionClient;

  sendToOwner?: boolean;

  clientPhoneNumber: string;

  from:
    | "NEW_INVOICE"
    | "UPDATE_INVOICE"
    | "DELETE_INVOICE"
    | "NEW_DELIVERY"
    | "DEU_COLLECTION"
    | "UPDATE_DEU_COLLECTION";

  clientMessage?: string;

  ownerMessage?: string;
};

export const getUserAndPermissionForSms = async ({
  clientPhoneNumber,
  clientMessage,
  ownerMessage,
  sendToOwner,
  tx,
  user,
  from,
}: TSmsSend) => {
  const [userInfo, vataOwners, smsPermission, smsWallet] = await Promise.all([
    tx.user.findFirst({
      where: {
        username: user.username,
      },
      select: {
        id: true,
        name: true,
        username: true,
      },
    }),

    tx.user.findMany({
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

    tx.vataSmsSettings.findFirst({
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

    tx.smsWallet.findFirst({
      where: {
        vataId: user.vataId,
      },
    }),
  ]);

  // OWNER PHONE NUMBERS
  const ownerPhoneNumbers = [
    ...new Set(
      vataOwners
        .map((owner) => owner.vata?.ownerPhoneNumber)
        .filter((phone): phone is string => Boolean(phone)),
    ),
  ];

  // SMS PERMISSION
  const permissionMap: Record<TSmsSend["from"], boolean> = {
    NEW_INVOICE: Boolean(smsPermission?.newInvoice),
    UPDATE_INVOICE: Boolean(smsPermission?.updateInvoice),
    DELETE_INVOICE: Boolean(smsPermission?.deleteInvoice),
    NEW_DELIVERY: Boolean(smsPermission?.newDelivery),
    DEU_COLLECTION: Boolean(smsPermission?.newDueCollection),
    UPDATE_DEU_COLLECTION: Boolean(smsPermission?.deuCollectionUpdate),
  };

  const hasPermission = permissionMap[from];

  // PERMISSION OFF
  if (!hasPermission) {
    return {
      success: false,
      message: "SMS permission is disabled",
      from,
      smsPermission: false,
      smsNumbers: [],
    };
  }

  // CLIENT NUMBERS
  const clientNumbers: string[] = [];

  if (clientPhoneNumber && clientMessage) {
    clientNumbers.push(clientPhoneNumber);
  }

  // OWNER NUMBERS
  const ownerNumbers = sendToOwner && ownerMessage ? ownerPhoneNumbers : [];

  // ALL SMS NUMBERS
  const smsNumbers = [...clientNumbers, ...ownerNumbers];

  // TOTAL SMS
  const totalSms = smsNumbers.length;

  // যদি কোনো SMS পাঠানোর দরকার না থাকে
  if (totalSms === 0) {
    return {
      success: false,
      message: "No SMS number found",
      from,
      smsPermission: true,
      smsNumbers: [],
    };
  }

  // SMS RATE
  const smsRate = smsWallet?.currentRate ?? 0;

  // TOTAL SMS COST
  const totalCost = totalSms * Number(smsRate);

  // WALLET না থাকলে
  if (!smsWallet) {
    return {
      success: false,
      message: "SMS wallet not found",
      from,
      smsPermission: true,
      smsNumbers,
    };
  }

  // BALANCE CHECK
  const currentBalance = Number(smsWallet.balance);

  if (currentBalance < totalCost) {
    return {
      success: false,
      message: "Insufficient SMS balance",
      from,
      smsPermission: true,
      smsNumbers: [],
      requiredBalance: totalCost,
      currentBalance,
      totalSms,
    };
  }

  /*
   * ==============================
   * SEND CLIENT SMS
   * ==============================
   */

  if (clientNumbers.length && clientMessage) {
    await sendSmsToPhoneNumbers(clientNumbers, clientMessage);
  }

  /*
   * ==============================
   * SEND OWNER SMS
   * ==============================
   */

  if (ownerNumbers.length && ownerMessage) {
    await sendSmsToPhoneNumbers(ownerNumbers, ownerMessage);
  }

  /*
   * ==============================
   * CLIENT SMS LOG
   * ==============================
   */

  const clientLogs = clientNumbers.map((phoneNumber) => ({
    message: clientMessage as string,
    cost: Number(smsRate),
    phoneNumber,
    sendBy: userInfo?.username as string,
    status: SmsStatus.SENT,
    vataId: user.vataId,
  }));

  /*
   * ==============================
   * OWNER SMS LOG
   * ==============================
   */

  const ownerLogs = ownerNumbers.map((phoneNumber) => ({
    message: ownerMessage as string,
    cost: Number(smsRate),
    phoneNumber,
    sendBy: userInfo?.username as string,
    status: SmsStatus.SENT,
    vataId: user.vataId,
  }));

  const smsLogs = [...clientLogs, ...ownerLogs];

  /*
   * ==============================
   * SAVE SMS LOG
   * ==============================
   */

  if (smsLogs.length) {
    await tx.smsLog.createMany({
      data: smsLogs,
    });
  }

  /*
   * ==============================
   * UPDATE SMS WALLET
   * ==============================
   */

  await tx.smsWallet.update({
    where: {
      vataId: user.vataId,
    },

    data: {
      totalUsed: {
        increment: totalSms,
      },

      balance: {
        decrement: totalCost,
      },
    },
  });
};
