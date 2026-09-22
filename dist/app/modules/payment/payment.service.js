"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const prisma_1 = require("../../../helpers/prisma");
const ApplicationError_1 = require("../../errors/ApplicationError");
const http_status_codes_1 = require("http-status-codes");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const getDateRangeDbSearch_1 = require("../../../utils/getDateRangeDbSearch");
const createPaymentService = async (req, user) => {
    const file = req?.file;
    const body = JSON.parse(req.body.data);
    const ledgerId = await prisma_1.prisma.ledger.findFirst({
        where: { name: body.ledger, vataId: user.vataId, isDeleted: false },
        select: { id: true },
    });
    if (!ledgerId) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "খতিয়ান পাওয়া যায়নি।");
    }
    const data = {
        ledgerId: ledgerId.id,
        paymentType: body.paymentType,
        paymentDetails: body.paymentDetails,
        quantity: Number(body.quantity),
        rate: Number(body.rate),
        totalBill: Number(body.totalBill),
        cutting: Number(body.cutting),
        payment: Number(body.payment),
        paymentDifference: Number(body.paymentDifference),
        document: file?.filename || null,
        address: body.address || null,
    };
    const result = await prisma_1.prisma.payment.create({
        data: { ...data, vataId: user.vataId },
    });
    return result;
};
// GET ALL PAYMENTS
const getAllPaymentService = async (user, seasonId, query) => {
    const pagination = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {
        vataId: user.vataId,
        isDeleted: false,
        ledger: {
            seasonId,
        },
    };
    // Search by ledger name
    if (query.search?.trim()) {
        where.ledger = {
            is: {
                name: {
                    contains: query.search.trim(),
                    mode: "insensitive",
                },
            },
        };
    }
    // Filter by date
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        where.createdAt = dateRange;
    }
    const [result, total] = await prisma_1.prisma.$transaction([
        prisma_1.prisma.payment.findMany({
            where: where,
            include: {
                ledger: {
                    select: {
                        name: true,
                        id: true,
                    },
                },
            },
            skip: pagination.skip,
            take: pagination.limit,
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma_1.prisma.payment.count({
            where: where,
        }),
    ]);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit: pagination.limit,
        page: pagination.page,
        totalData: total,
    });
    return {
        meta,
        data: result,
    };
};
// GET PAYMENT REPORT GROUP VIA DATE
const paymentReportViaGroupService = async (user, seasonId, date) => {
    const where = {
        isDeleted: false,
        vataId: user.vataId,
        ledger: {
            seasonId,
        },
    };
    if (date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(date);
        if (dateRange) {
            where.paymentDate = dateRange;
        }
    }
    const result = await prisma_1.prisma.payment.findMany({
        where,
        include: { ledger: { include: { parent: true } } },
    });
    const groupedPayments = Object.values(result.reduce((acc, item) => {
        const groupId = item.ledger.parent?.id ?? item.ledger.id;
        const groupName = item.ledger.parent?.name ?? item.ledger.name;
        if (!acc[groupId]) {
            acc[groupId] = {
                ledgerId: groupId,
                ledger: groupName,
                quantity: 0,
                totalBill: 0,
                cutting: 0,
                payment: 0,
                advancePayment: 0,
                paymentDifference: 0,
            };
        }
        acc[groupId].quantity += item.quantity;
        acc[groupId].totalBill += item.totalBill;
        acc[groupId].cutting += item.cutting;
        if (item.paymentType === "অগ্রিম পেমেন্ট") {
            acc[groupId].advancePayment += item.payment;
        }
        else {
            acc[groupId].payment += item.payment;
        }
        acc[groupId].paymentDifference += item.paymentDifference;
        return acc;
    }, {}));
    return groupedPayments;
};
// GET SINGLE PAYMENT
const getSinglePaymentService = async (user, id) => {
    return prisma_1.prisma.payment.findFirst({
        where: { vataId: user.vataId, id: id },
        include: { ledger: { select: { name: true } } },
    });
};
// UPDATE PAYMENT
const updatePaymentService = async (user, req) => {
    const id = req.params.id;
    const file = req.file;
    const body = JSON.parse(req.body.data);
    // ============================================
    // 1. Check existing payment
    // ============================================
    const existingPayment = await prisma_1.prisma.payment.findUnique({
        where: {
            vataId: user.vataId,
            id,
        },
    });
    if (!existingPayment) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "পেমেন্ট পাওয়া যায়নি।");
    }
    // ============================================
    // 2. Find ledger
    // ============================================
    const ledger = await prisma_1.prisma.ledger.findFirst({
        where: {
            name: body.ledger,
            vataId: user.vataId,
        },
        select: {
            id: true,
        },
    });
    if (!ledger) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "খতিয়ান পাওয়া যায়নি।");
    }
    // ============================================
    // 3. Prepare update data
    // ============================================
    const data = {
        ledgerId: ledger.id,
        paymentType: body.paymentType,
        paymentDetails: body.paymentDetails,
        quantity: Number(body.quantity) || 0,
        rate: Number(body.rate) || 0,
        totalBill: Number(body.totalBill) || 0,
        cutting: Number(body.cutting) || 0,
        payment: Number(body.payment) || 0,
        paymentDifference: Number(body.paymentDifference) || 0,
        paymentDate: body.paymentDate,
    };
    // ============================================
    // 4. New file থাকলে শুধু তখন document update
    // ============================================
    if (file?.filename) {
        data.document = file.filename;
    }
    // ============================================
    // 5. Update
    // ============================================
    const result = await prisma_1.prisma.payment.update({
        where: {
            id,
            vataId: user.vataId,
        },
        data,
    });
    return result;
};
// DELETE PAYMENT
const deletePaymentServie = async (user, id) => {
    return await prisma_1.prisma.payment.update({
        where: { id, vataId: user.vataId },
        data: { isDeleted: true },
    });
};
exports.PaymentService = {
    createPaymentService,
    getAllPaymentService,
    paymentReportViaGroupService,
    getSinglePaymentService,
    updatePaymentService,
    deletePaymentServie,
};
