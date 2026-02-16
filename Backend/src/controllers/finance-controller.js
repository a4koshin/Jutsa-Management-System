// finance controller
import { ObjectId } from "mongodb";
import prisma from "../config/db.js";
import asyncHandler from "express-async-handler";
import generateCustomId from "../utils/generate-custom-id.js";
// Create
export const registerFinance = asyncHandler(async (req, res) => {
  const { title, amount, type, userId, category } = req.body;

  console.log(req.body);

  const id = await generateCustomId()
  console.log(id)

  if (!title || !amount || !type || !userId || !category) {
    res.status(400);
    throw new Error("All fields are required" + title + " " + amount + " " + type + " " + userId + " " + category);
  }

  const finance = await prisma.finance.create({
    data: {
      id : id,
      title,
      amount: Number(amount),
      type,
      category,
      userId,
    },
  });

  if (!finance) {
    res.status(501);
    throw new Error("Finance not created");
  }

  res.status(201).json({
    success: true,
    error: null,
    message: "Register successfully",
    data: finance,
  });
});

// Read financial information

export const getFinances = asyncHandler(async (req, res) => {
  const finances = await prisma.finance.findMany();

  res.status(200).json({
    success: true,
    error: null,
    data: finances,
  });
});

// Read single financial information

export const getFinance = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const finance = await prisma.finance.findUnique({
    where: {
      id,
    },
  });

  if (!finance) {
    res.status(404);
    throw new Error("Unable to find:No finance found");
  }

  res.status(200).json({
    success: true,
    error: null,
    data: finance,
  });
});

// Delete Finance using unique ID

export const deleteFinance = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // if (!ObjectId.isValid(id)) {
  //   res.status(400);
  //   throw new Error("Please provide a valid id");
  // }

  const deletedFinance = await prisma.finance.delete({
    where: {
      id,
    },
  });

  if (!deletedFinance) {
    res.status(501);
    throw new Error("Unable to delete: unexpected error occurred");
  }

  res.status(200).json({
    success: true,
    error: null,
    message: "Deleted successfully",
    data: deletedFinance,
  });
});

// Update Finance using unique ID

export const updateFinance = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, amount, type, category, userId } = req.body;

  // if (!ObjectId.isValid(id)) {
  //   res.status(400);
  //   throw new Error("Please provide a valid id");
  // }

  const isFinanceExists = await prisma.finance.findUnique({
    where: {
      id,
    },
  });

  if (!isFinanceExists) {
    res.status(404);
    throw new Error("Unable to find:No finance found");
  }

  const updatedFinance = await prisma.finance.update({
    data: {
      title: title,
      amount: Number(amount),
      type: type,
      category: category,
      userId: userId,
    },
    where: {
      id,
    },
  });

  if (!updatedFinance) {
    res.status(501);
    throw new Error("Unable to update: unexpected error occurred");
  }

  res.status(200).json({
    success: true,
    error: null,
    message: "Updated successfully",
    data: updatedFinance,
  });
});
