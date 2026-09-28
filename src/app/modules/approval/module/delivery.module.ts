import { ApprovalRequest } from "../../../../generated/prisma/client";
import { prisma } from "../../../../helpers/prisma";
import { TAuthUser } from "../../../../interface/token";
import { DeliveryService } from "../../delivery/delivery.service";

export const deliveryModule = async (
  user: TAuthUser,
  findRequest: Partial<ApprovalRequest>,
  approvalId: string,
) => {
  if (findRequest.action === "UPDATE") {
    // Delivery update approval
  }

  if (findRequest.action === "DELETE") {
    const result = await DeliveryService.deleteDeliveryService(
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
      message: "ডেলিভারি মুছে ফেলার অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
    };
  }
};
