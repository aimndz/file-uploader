import asyncHandler from "express-async-handler";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { PrismaClient } from "@prisma/client";
import { formatSize } from "../config/utils.js";

const prisma = new PrismaClient();

const setHomeData = asyncHandler(async (req, res, next) => {
  // Initialize errors if not already present
  res.locals.errors = res.locals.errors || [];

  const currentFolder = await prisma.folder.findFirst({
    where: {
      id: req.params.id || "root",
    },
    select: {
      name: true,
    },
  });

  const files = await prisma.file.findMany({
    where: {
      userId: req.user.id,
      folderId: req.params.id || null,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const folders = await prisma.folder.findMany({
    where: {
      userId: req.user.id,
      parentFolderId: req.params.id || null,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Modify each item based on their type
  const items = [
    ...folders.map((folder) => ({
      ...folder,
      type: "folder",
      createdAt: formatDistanceToNowStrict(folder.createdAt, {
        addSuffix: true,
      }),
      modifiedAt: formatDistanceToNowStrict(folder.modifiedAt, {
        addSuffix: true,
      }),
    })),
    ...files.map((file) => ({
      ...file,
      type: "file",
      size: formatSize(file.size),
      createdAt: formatDistanceToNowStrict(file.createdAt, {
        addSuffix: true,
      }),
      modifiedAt: formatDistanceToNowStrict(file.modifiedAt, {
        addSuffix: true,
      }),
    })),
  ];

  res.locals.title = currentFolder ? currentFolder.name : "Home Page";
  res.locals.user = req.user;
  res.locals.items = items;
  res.locals.folderId = req.params.id || null;

  next();
});

export default setHomeData;
