import { YoutubeLink } from "../../../../generated/prisma/client";
import { prisma } from "../../../../helpers/prisma";

const createYoutubeLinkService = async (payload: YoutubeLink) => {
  const result = await prisma.youtubeLink.create({
    data: payload,
  });

  return result;
};

const getAllYoutubeLinksService = async () => {
  const result = await prisma.youtubeLink.findMany({});
  return result;
};

const deleteYoutubeLinkService = async (id: string) => {
  const result = await prisma.youtubeLink.delete({
    where: {
      id,
    },
  });

  return result;
};

export const YoutubeLinkService = {
  createYoutubeLinkService,
  getAllYoutubeLinksService,
  deleteYoutubeLinkService,
};
