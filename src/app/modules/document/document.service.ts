import { StatusCodes } from "http-status-codes";
import { Document } from "../../../generated/prisma/client"
import { prisma } from "../../../helpers/prisma"
import { AppError } from "../../errors/ApplicationError";
import { Request } from "express";
import { IUploadFile } from "../../../interface/multer";
import fs from "fs/promises";
import path from "path";

const createFolderService = async (payload: Document) => {

    const isExist = await prisma.document.findFirst({
        where: {
            name: payload.name,
            type: "FOLDER"
        }
    })

    if (isExist?.id) {
        throw new AppError(
            StatusCodes.CONFLICT,
            "এই নামে একটি ফোল্ডার ইতোমধ্যে রয়েছে।"
        );
    }

    payload.type = "FOLDER"
    const result = await prisma.document.create({ data: payload })
    return result
}

// UPDATE FOLDER NAME
const updateFolderNameService = async (id: string, payload: Document) => {
    const exist = await prisma.document.findFirst({ where: { id } })
    if (!exist?.id) {
        throw new AppError(StatusCodes.NOT_FOUND, "কোনো ডকুমেন্ট পাওয়া যায়নি।")
    }
    const result = await prisma.document.update({ data: payload, where: { id } })
    return result

}


// GET ROOT FOLDERS + ROOT FILES
const getAllDocumentsService = async () => {
    const result = await prisma.document.findMany({
        where: {
            parentId: null,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return result.map((item) => ({
        ...item,
        size: item.size ? Number(item.size) : null,
    }));
};

// GET SINGLE FOLDER
const getSingleFolderService = async (id: string) => {
    return await prisma.document.findFirst({
        where: {
            id,
            type: "FOLDER",
        },
        select: {
            id: true,
            name: true,
        },
    });
};

// GET EACH FOLDER DOCUMENTS
const getSingleDocumentService = async (id: string) => {
    const result = await prisma.document.findFirst({
        where: {
            id: id,
            type: "FOLDER"
        }, include: {
            children: true
        }
    });
    if (!result) {
        return
    }

    return {
        ...result,
        children: result.children.map((child) => ({
            ...child,
            size: child.size !== null
                ? Number(child.size)
                : null,
        })),
    };
};

// const upload 
const uploadDocumentService = async (req: Request) => {
    const parentId = req.body.parentId;
    console.log(parentId);
    const file = req.file as IUploadFile | undefined;
    if (!file) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "কোনো ফাইল নির্বাচন করা হয়নি।"
        );
    }

    // Check parent folder
    if (parentId) {
        const parentFolder = await prisma.document.findFirst({
            where: {
                id: parentId,
                type: "FOLDER",
            },
        });

        if (!parentFolder) {
            throw new AppError(
                StatusCodes.NOT_FOUND,
                "ফোল্ডারটি পাওয়া যায়নি।"
            );
        }
    }

    // Same name check inside same folder
    const isExist = await prisma.document.findFirst({
        where: {
            name: file.filename,
            parentId: parentId ?? null,
        },
    });

    if (isExist) {
        throw new AppError(
            StatusCodes.CONFLICT,
            "এই নামে একটি ফাইল ইতোমধ্যে রয়েছে।"
        );
    }

    const fileUrl = "";
    const fileKey = "";

    const extension = file.filename.includes(".")
        ? file.filename.split(".").pop()
        : "";
    const result = await prisma.document.create({
        data: {
            name: file.filename,
            type: "FILE",

            parentId: parentId ?? null,

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
const deleteDocumentService = async (id: string) => {

    const document = await prisma.document.findUnique({
        where: {
            id,
        },
    });

    if (!document) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "ফাইলটি পাওয়া যায়নি।"
        );
    }

    // uploads folder
    const uploadPath = path.join(
        process.cwd(),
        "uploads"
    );

    // শুধু filename নেওয়া হচ্ছে, যাতে path traversal না হয়
    const fileName = path.basename(document.name);

    const filePath = path.join(
        uploadPath,
        fileName
    );

    // Physical file delete
    try {
        await fs.unlink(filePath);
    } catch (error: any) {
        // File না থাকলেও DB record delete করতে পারবে
        if (error.code !== "ENOENT") {
            throw new AppError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                "ফাইলটি মুছে ফেলা যায়নি।"
            );
        }
    }

    // Database থেকে delete
    await prisma.document.delete({
        where: {
            id,
        },
    });

    return true;
};

// DELETE FOLDER

const deleteFolderService = async (id: string) => {
    // Check folder
    const folder = await prisma.document.findFirst({
        where: {
            id,
            type: "FOLDER",
        },
    });

    if (!folder) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "ফোল্ডারটি পাওয়া যায়নি।"
        );
    }

    // uploads folder
    const uploadPath = path.join(
        process.cwd(),
        "uploads"
    );

    // Recursiveভাবে সব children বের করবে
    const getAllChildren = async (
        parentId: string
    ): Promise<any[]> => {
        const children = await prisma.document.findMany({
            where: {
                parentId,
            },
        });

        let allChildren: any[] = [];

        for (const child of children) {
            allChildren.push(child);

            // যদি folder হয় তাহলে তার children-ও বের করবে
            if (child.type === "FOLDER") {
                const nestedChildren =
                    await getAllChildren(child.id);

                allChildren = [
                    ...allChildren,
                    ...nestedChildren,
                ];
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
        const fileName = path.basename(item.name);

        const filePath = path.join(
            uploadPath,
            fileName
        );

        try {
            await fs.unlink(filePath);
        } catch (error: any) {
            // File না থাকলেও DB delete হবে
            if (error.code !== "ENOENT") {
                throw new AppError(
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    `ফাইলটি মুছে ফেলা যায়নি: ${item.name}`
                );
            }
        }
    }

    // সব child database record delete
    if (children.length > 0) {
        await prisma.document.deleteMany({
            where: {
                id: {
                    in: children.map(
                        (item) => item.id
                    ),
                },
            },
        });
    }

    // Parent folder delete
    await prisma.document.delete({
        where: {
            id,
        },
    });

    return true;
};

export const DocumentService = {
    createFolderService,
    getAllDocumentsService,
    uploadDocumentService,
    getSingleDocumentService,
    deleteDocumentService,
    updateFolderNameService,
    getSingleFolderService,
    deleteFolderService
}
