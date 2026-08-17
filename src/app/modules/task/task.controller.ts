import { Request, Response } from "express";
import { TaskService } from "./task.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { parseListQuery } from "../../../utils/parseListQuery";

// ==========================================
// Create Task
// ==========================================
const createTaskController = catchAsync(
    async (req: Request, res: Response) => {
        const result = await TaskService.createTaskService(req.body);

        if (!result) {
            throw new Error("কাজ তৈরি করা যায়নি");
        }

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "কাজ সফলভাবে তৈরি হয়েছে",
        });
    }
);


// ==========================================
// Get Pending Tasks
// ==========================================
const getPendingTasksController = catchAsync(
    async (req: Request, res: Response) => {
        const { date } = await parseListQuery(req.query);
        const result = await TaskService.getPendingTasksService({ date });

        if (!result.length) {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: "কোনো অসম্পূর্ণ কাজ পাওয়া যায়নি",
                data: [],
            });
            return;
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "অসম্পূর্ণ কাজগুলো সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
);


// ==========================================
// Get Complete Tasks
// ==========================================
const getCompleteTasksController = catchAsync(
    async (req: Request, res: Response) => {
        const { date } = await parseListQuery(req.query);
        const result = await TaskService.getCompleteTasksService({ date });

        if (!result.length) {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: "কোনো সম্পূর্ণ কাজ পাওয়া যায়নি",
                data: [],
            });
            return;
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "সম্পূর্ণ কাজগুলো সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
);


// ==========================================
// Get Single Task
// ==========================================
const getSingleTaskController = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const result = await TaskService.getSingleTaskService(id);

        if (!result) {
            throw new Error("কাজটি পাওয়া যায়নি");
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "কাজটি সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
);


// ==========================================
// Update Task
// ==========================================
const updateTaskController = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await TaskService.updateTaskService(
            id,
            req.body
        );

        if (!result) {
            throw new Error("কাজটি পাওয়া যায়নি");
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "কাজটি সফলভাবে আপডেট হয়েছে",
        });
    }
);


// ==========================================
// Delete Task
// ==========================================
const deleteTaskController = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const result = await TaskService.deleteTaskService(id);

        if (!result) {
            throw new Error("কাজটি পাওয়া যায়নি");
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "কাজটি সফলভাবে মুছে ফেলা হয়েছে",
            data: result,
        });
    }
);


// ==========================================
// Export
// ==========================================
export const TaskManagerController = {
    createTaskController,
    getPendingTasksController,
    getCompleteTasksController,
    getSingleTaskController,
    updateTaskController,
    deleteTaskController,
};