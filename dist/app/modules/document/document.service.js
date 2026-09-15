"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentService = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../../../helpers/prisma");
const ApplicationError_1 = require("../../errors/ApplicationError");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const createFolderService = async (user, payload) => {
    const isExist = await prisma_1.prisma.document.findFirst({
        where: {
            name: payload.name,
            type: "FOLDER",
            vataId: user.vataId,
        },
    });
    if (isExist?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "এই নামে একটি ফোল্ডার ইতোমধ্যে রয়েছে।");
    }
    payload.type = "FOLDER";
    payload.vataId = user.vataId;
    const result = await prisma_1.prisma.document.create({ data: payload });
    return result;
};
// UPDATE FOLDER NAME
const updateFolderNameService = async (user, id, payload) => {
    const exist = await prisma_1.prisma.document.findFirst({
        where: { id, vataId: user.vataId },
    });
    if (!exist?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "কোনো ডকুমেন্ট পাওয়া যায়নি।");
    }
    const result = await prisma_1.prisma.document.update({ data: payload, where: { id } });
    return result;
};
// GET ROOT FOLDERS + ROOT FILES
const getAllDocumentsService = async (user) => {
    const [result, storage, vata] = await Promise.all([
        prisma_1.prisma.document.findMany({
            where: {
                parentId: null,
                vataId: user.vataId,
            },
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma_1.prisma.document.aggregate({
            where: {
                vataId: user.vataId,
                type: "FILE",
            },
            _sum: {
                size: true,
            },
        }),
        prisma_1.prisma.vata.findFirst({
            where: {
                id: user.vataId,
            },
            select: {
                subscriptionPlan: {
                    select: {
                        maxStorage: true,
                    },
                },
            },
        }),
    ]);
    const totalStorageBytes = Number(storage._sum.size ?? 0);
    const usedStorageGB = totalStorageBytes / (1024 * 1024 * 1024);
    const maxStorageGB = Number(vata?.subscriptionPlan?.maxStorage ?? 0);
    const remainingStorageGB = Math.max(maxStorageGB - usedStorageGB, 0);
    return {
        documents: result.map((item) => ({
            ...item,
            size: item.size ? Number(item.size) : null,
        })),
        storage: {
            usedGB: Number(usedStorageGB.toFixed(2)),
            limitGB: maxStorageGB,
            remainingGB: Number(remainingStorageGB.toFixed(2)),
        },
    };
};
// GET SINGLE FOLDER
const getSingleFolderService = async (user, id) => {
    return await prisma_1.prisma.document.findFirst({
        where: {
            id,
            type: "FOLDER",
            vataId: user.vataId,
        },
        select: {
            id: true,
            name: true,
        },
    });
};
// GET EACH FOLDER DOCUMENTS
const getSingleDocumentService = async (user, id) => {
    const result = await prisma_1.prisma.document.findFirst({
        where: {
            id: id,
            vataId: user.vataId,
            type: "FOLDER",
        },
        include: {
            children: true,
        },
    });
    if (!result) {
        return;
    }
    return {
        ...result,
        children: result.children.map((child) => ({
            ...child,
            size: child.size !== null ? Number(child.size) : null,
        })),
    };
};
// const upload
const uploadDocumentService = async (user, req) => {
    const plan = await prisma_1.prisma.vata.findFirst({
        where: {
            id: user.vataId,
        },
        select: {
            nameBangla: true,
            subscriptionPlan: {
                select: {
                    name: true,
                    maxStorage: true,
                },
            },
        },
    });
    const parentId = req.body.parentId;
    const file = req.file;
    if (!file) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "কোনো ফাইল নির্বাচন করা হয়নি।");
    }
    const removeUploadedFile = async () => {
        if (file.path) {
            try {
                await promises_1.default.unlink(file.path);
            }
            catch (error) {
                console.error("Temporary file delete failed:", error);
            }
        }
    };
    if (!plan?.subscriptionPlan?.name) {
        await removeUploadedFile();
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "আপনার স্টোরেজ প্ল্যান পাওয়া যায়নি।");
    }
    if (parentId) {
        const parentFolder = await prisma_1.prisma.document.findFirst({
            where: {
                id: parentId,
                type: "FOLDER",
                vataId: user.vataId,
            },
        });
        if (!parentFolder) {
            await removeUploadedFile();
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ফোল্ডারটি পাওয়া যায়নি।");
        }
    }
    const isExist = await prisma_1.prisma.document.findFirst({
        where: {
            name: file.filename,
            parentId: parentId ?? null,
            vataId: user.vataId,
        },
    });
    if (isExist) {
        await removeUploadedFile();
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "এই নামে একটি ফাইল ইতোমধ্যে রয়েছে।");
    }
    const storage = await prisma_1.prisma.document.aggregate({
        where: {
            vataId: user.vataId,
            type: "FILE",
        },
        _sum: {
            size: true,
        },
    });
    const maxStorageGB = Number(plan.subscriptionPlan.maxStorage);
    const maxStorageBytes = maxStorageGB * 1024 * 1024 * 1024;
    const usedStorageBytes = Number(storage._sum.size ?? 0);
    const newFileSizeBytes = Number(file.size);
    const totalStorageBytes = usedStorageBytes + newFileSizeBytes;
    if (totalStorageBytes > maxStorageBytes) {
        await removeUploadedFile();
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "আপনার স্টোরেজ লিমিট শেষ হয়ে গেছে। নতুন ফাইল আপলোড করার জন্য পর্যাপ্ত স্টোরেজ নেই।");
    }
    const fileUrl = "";
    const fileKey = "";
    const extension = file.filename.includes(".")
        ? file.filename.split(".").pop()
        : "";
    await prisma_1.prisma.document.create({
        data: {
            name: file.filename,
            type: "FILE",
            parentId: parentId ?? null,
            vataId: user.vataId,
            fileUrl,
            fileKey,
            mimeType: file.mimetype,
            size: BigInt(file.size),
            extension,
        },
    });
    return true;
};
// DELETE DOCUEMTS
const deleteDocumentService = async (user, id) => {
    const document = await prisma_1.prisma.document.findUnique({
        where: {
            id,
            vataId: user.vataId,
        },
    });
    if (!document) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ফাইলটি পাওয়া যায়নি।");
    }
    // uploads folder
    const uploadPath = path_1.default.join(process.cwd(), "uploads");
    // শুধু filename নেওয়া হচ্ছে, যাতে path traversal না হয়
    const fileName = path_1.default.basename(document.name);
    const filePath = path_1.default.join(uploadPath, fileName);
    // Physical file delete
    try {
        await promises_1.default.unlink(filePath);
    }
    catch (error) {
        // File না থাকলেও DB record delete করতে পারবে
        if (error.code !== "ENOENT") {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "ফাইলটি মুছে ফেলা যায়নি।");
        }
    }
    // Database থেকে delete
    await prisma_1.prisma.document.delete({
        where: {
            id,
            vataId: user.vataId,
        },
    });
    return true;
};
// DELETE FOLDER
const deleteFolderService = async (user, id) => {
    // Check folder
    const folder = await prisma_1.prisma.document.findFirst({
        where: {
            id,
            type: "FOLDER",
            vataId: user.vataId,
        },
    });
    if (!folder) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ফোল্ডারটি পাওয়া যায়নি।");
    }
    // uploads folder
    const uploadPath = path_1.default.join(process.cwd(), "uploads");
    // Recursiveভাবে সব children বের করবে
    const getAllChildren = async (parentId) => {
        const children = await prisma_1.prisma.document.findMany({
            where: {
                parentId,
                vataId: user.vataId,
            },
        });
        let allChildren = [];
        for (const child of children) {
            allChildren.push(child);
            // যদি folder হয় তাহলে তার children-ও বের করবে
            if (child.type === "FOLDER") {
                const nestedChildren = await getAllChildren(child.id);
                allChildren = [...allChildren, ...nestedChildren];
            }
        }
        return allChildren;
    };
    const children = await getAllChildren(id);
    // সব physical files delete
    for (const item of children) {
        // Folder-এর physical file নেই
        if (item.type !== "FILE" || !item.name) {
            continue;
        }
        // শুধু filename নেওয়া হচ্ছে
        // path traversal prevent করার জন্য
        const fileName = path_1.default.basename(item.name);
        const filePath = path_1.default.join(uploadPath, fileName);
        try {
            await promises_1.default.unlink(filePath);
        }
        catch (error) {
            // File না থাকলেও DB delete হবে
            if (error.code !== "ENOENT") {
                throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `ফাইলটি মুছে ফেলা যায়নি: ${item.name}`);
            }
        }
    }
    // সব child database record delete
    if (children.length > 0) {
        await prisma_1.prisma.document.deleteMany({
            where: {
                id: {
                    in: children.map((item) => item.id),
                },
                vataId: user.vataId,
            },
        });
    }
    // Parent folder delete
    await prisma_1.prisma.document.delete({
        where: {
            id,
            vataId: user.vataId,
        },
    });
    return true;
};
exports.DocumentService = {
    createFolderService,
    getAllDocumentsService,
    uploadDocumentService,
    getSingleDocumentService,
    deleteDocumentService,
    updateFolderNameService,
    getSingleFolderService,
    deleteFolderService,
};
