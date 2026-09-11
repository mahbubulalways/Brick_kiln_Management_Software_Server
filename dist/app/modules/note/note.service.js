"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteService = void 0;
const prisma_1 = require("../../../helpers/prisma");
const createNoteService = async (payload) => {
    const { id, ...noteData } = payload;
    if (id) {
        return await prisma_1.prisma.note.update({
            where: {
                id,
            },
            data: noteData,
        });
    }
    return await prisma_1.prisma.note.create({
        data: noteData,
    });
};
const getNoteService = async () => {
    const result = await prisma_1.prisma.note.findFirst({
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
};
exports.NoteService = {
    createNoteService,
    getNoteService,
};
