

// ==========================================
// Create Task

import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch";

// ==========================================
const createTaskService = async (
    payload: Prisma.TaskManagerCreateInput
) => {
    const result = await prisma.taskManager.create({
        data: payload
    });

    return result;
};





// ==========================================
// Get Pending Tasks
// ==========================================
const getPendingTasksService = async (query: TQuery) => {
    const where: Prisma.TaskManagerWhereInput = { isDeleted: false, status: "PENDING", };
    if (query.date) {
        const dateRange = getDateRangeDbSearch(query.date);
        if (dateRange) {
            where.date = dateRange;
        }
    }
    const result = await prisma.taskManager.findMany({
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
const getCompleteTasksService = async (query: TQuery) => {
     const where: Prisma.TaskManagerWhereInput = { isDeleted: false, status: "COMPLETE", };
    if (query.date) {
        const dateRange = getDateRangeDbSearch(query.date);
        if (dateRange) {
            where.date = dateRange;
        }
    }
    const result = await prisma.taskManager.findMany({
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
const getSingleTaskService = async (id: string) => {
    const result = await prisma.taskManager.findUnique({
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
const updateTaskService = async (
    id: string,
    payload: Prisma.TaskManagerUpdateInput
) => {
    const updateData = {
        ...payload,
        ...(payload.date && {
            date: new Date(payload.date as string),
        }),
    };

    const result = await prisma.taskManager.update({
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
const deleteTaskService = async (id: string) => {
    const result = await prisma.taskManager.delete({
        where: {
            id,
        },
    });

    return result;
};


export const TaskService = {
    createTaskService,
    getPendingTasksService,
    getCompleteTasksService,
    getSingleTaskService,
    updateTaskService,
    deleteTaskService,
};