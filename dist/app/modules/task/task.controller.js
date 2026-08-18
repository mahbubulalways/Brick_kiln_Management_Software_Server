"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManagerController = void 0;
const task_service_1 = require("./task.service");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = require("../../../utils/sendResponse");
const parseListQuery_1 = require("../../../utils/parseListQuery");
// ==========================================
// Create Task
// ==========================================
const createTaskController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await task_service_1.TaskService.createTaskService(req.body);
    if (!result) {
        throw new Error("কাজ তৈরি করা যায়নি");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "কাজ সফলভাবে তৈরি হয়েছে",
    });
});
// ==========================================
// Get Pending Tasks
// ==========================================
const getPendingTasksController = (0, catchAsync_1.default)(async (req, res) => {
    const { date } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await task_service_1.TaskService.getPendingTasksService({ date });
    if (!result.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "কোনো অসম্পূর্ণ কাজ পাওয়া যায়নি",
            data: [],
        });
        return;
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "অসম্পূর্ণ কাজগুলো সফলভাবে পাওয়া গেছে",
        data: result,
    });
});
// ==========================================
// Get Complete Tasks
// ==========================================
const getCompleteTasksController = (0, catchAsync_1.default)(async (req, res) => {
    const { date } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await task_service_1.TaskService.getCompleteTasksService({ date });
    if (!result.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "কোনো সম্পূর্ণ কাজ পাওয়া যায়নি",
            data: [],
        });
        return;
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "সম্পূর্ণ কাজগুলো সফলভাবে পাওয়া গেছে",
        data: result,
    });
});
// ==========================================
// Get Single Task
// ==========================================
const getSingleTaskController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await task_service_1.TaskService.getSingleTaskService(id);
    if (!result) {
        throw new Error("কাজটি পাওয়া যায়নি");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "কাজটি সফলভাবে পাওয়া গেছে",
        data: result,
    });
});
// ==========================================
// Update Task
// ==========================================
const updateTaskController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await task_service_1.TaskService.updateTaskService(id, req.body);
    if (!result) {
        throw new Error("কাজটি পাওয়া যায়নি");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "কাজটি সফলভাবে আপডেট হয়েছে",
    });
});
// ==========================================
// Delete Task
// ==========================================
const deleteTaskController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await task_service_1.TaskService.deleteTaskService(id);
    if (!result) {
        throw new Error("কাজটি পাওয়া যায়নি");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "কাজটি সফলভাবে মুছে ফেলা হয়েছে",
        data: result,
    });
});
// ==========================================
// Export
// ==========================================
exports.TaskManagerController = {
    createTaskController,
    getPendingTasksController,
    getCompleteTasksController,
    getSingleTaskController,
    updateTaskController,
    deleteTaskController,
};
