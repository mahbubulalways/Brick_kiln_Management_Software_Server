// ==========================================
// Create Task

import { Prisma, TaskManager } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { TAuthUser } from "../../../interface/token";
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch";

// ==========================================
const createTaskService = async (user: TAuthUser, payload: TaskManager) => {
  const result = await prisma.taskManager.create({
    data: {
      ...payload,
      vataId: user.vataId,
    },
  });

  return result;
};

// ==========================================
// Get Pending Tasks
// ==========================================
const getPendingTasksService = async (user: TAuthUser, query: TQuery) => {
  const where: Prisma.TaskManagerWhereInput = {
    vataId: user.vataId,
    isDeleted: false,
    status: "PENDING",
  };
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
const getCompleteTasksService = async (user: TAuthUser, query: TQuery) => {
  const where: Prisma.TaskManagerWhereInput = {
    isDeleted: false,
    status: "COMPLETE",
    vataId: user.vataId,
  };
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
const getSingleTaskService = async (user: TAuthUser, id: string) => {
  const result = await prisma.taskManager.findUnique({
    where: {
      id,
      vataId: user.vataId,
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
  user: TAuthUser,
  id: string,
  payload: Prisma.TaskManagerUpdateInput,
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
      vataId: user.vataId,
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
const deleteTaskService = async (user: TAuthUser, id: string) => {
  const result = await prisma.taskManager.delete({
    where: {
      id,
      vataId: user.vataId,
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
