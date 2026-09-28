"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryModule = void 0;
const prisma_1 = require("../../../../helpers/prisma");
const delivery_service_1 = require("../../delivery/delivery.service");
const deliveryModule = async (user, findRequest, approvalId) => {
    if (findRequest.action === "UPDATE") {
        // Delivery update approval
    }
    if (findRequest.action === "DELETE") {
        const result = await delivery_service_1.DeliveryService.deleteDeliveryService(user, findRequest.targetId);
        await prisma_1.prisma.approvalRequest.update({
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
exports.deliveryModule = deliveryModule;
