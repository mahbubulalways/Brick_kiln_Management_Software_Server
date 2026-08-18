"use strict";
// ==========================================
// Create Task
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const prisma_1 = require("../../../helpers/prisma");
const getDateRangeDbSearch_1 = require("../../../utils/getDateRangeDbSearch");
// ==========================================
const createTaskService = async (payload) => {
    const result = await prisma_1.prisma.taskManager.create({
        data: payload
    });
    return result;
};
// ==========================================
// Get Pending Tasks
// ==========================================
const getPendingTasksService = async (query) => {
    const where = { isDeleted: false, status: "PENDING", };
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            where.date = dateRange;
        }
    }
    const result = await prisma_1.prisma.taskManager.findMany({
        where,
        orderBy: {
            date: "desc",
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    return result;
};
// ==========================================
// Get Complete Tasks
// ==========================================
const getCompleteTasksService = async (query) => {
    const where = { isDeleted: false, status: "COMPLETE", };
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            where.date = dateRange;
        }
    }
    const result = await prisma_1.prisma.taskManager.findMany({
        where,
        orderBy: {
            date: "desc",
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    return result;
};
// ==========================================
// Get Single Task
// ==========================================
const getSingleTaskService = async (id) => {
    const result = await prisma_1.prisma.taskManager.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    return result;
};
// ==========================================
// Update Task
// ==========================================
const updateTaskService = async (id, payload) => {
    const updateData = {
        ...payload,
        ...(payload.date && {
            date: new Date(payload.date),
        }),
    };
    const result = await prisma_1.prisma.taskManager.update({
        where: {
            id,
        },
        data: updateData,
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    return result;
};
// ==========================================
// Delete Task
// ==========================================
const deleteTaskService = async (id) => {
    const result = await prisma_1.prisma.taskManager.delete({
        where: {
            id,
        },
    });
    return result;
};
exports.TaskService = {
    createTaskService,
    getPendingTasksService,
    getCompleteTasksService,
    getSingleTaskService,
    updateTaskService,
    deleteTaskService,
};
