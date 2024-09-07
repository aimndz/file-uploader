import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const setHomeData = asyncHandler(async (req, res, next) => {
  // Initialize errors if not already present
  res.locals.errors = res.locals.errors || [];

  console.log(res.locals.errors);

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
    ...folders.map((folder) => ({ ...folder, type: "folder" })),
    ...files.map((file) => ({ ...file, type: "file" })),
  ];

  res.locals.title = currentFolder ? currentFolder.name : "Home Page";
  res.locals.user = req.user;
  res.locals.items = items;
  res.locals.folderId = req.params.id || null;

  next();
});

export default setHomeData;
