import { Note } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";

const createNoteService = async (payload: Note) => {
  const { id, ...noteData } = payload;
  if (id) {
    return await prisma.note.update({
      where: {
        id,
      },
      data: noteData,
    });
  }

  return await prisma.note.create({
    data: noteData,
  });
};

const getNoteService = async () => {
  const result = await prisma.note.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

export const NoteService = {
  createNoteService,
  getNoteService,
};
