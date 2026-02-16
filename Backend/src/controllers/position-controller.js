import { ObjectId } from "mongodb";
import prisma from "../config/db.js";
import asyncHandler from "express-async-handler";

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => ObjectId.isValid(id);

// Get all positions
export const getAllPositions = asyncHandler(async (req, res) => {
  const positions = await prisma.position.findMany();
  res.status(200).json({ success: true, data: positions });
});

// Get position by ID
export const getPositionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID format" });
  }

  const position = await prisma.position.findUnique({ where: { id } });

  if (!position) {
    return res.status(404).json({ success: false, message: "Position not found" });
  }

  res.status(200).json({ success: true, data: position });
});

// Register a new position
export const registerPosition = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ success: false, message: "Title and description are required" });
  }

  const existingPosition = await prisma.position.findUnique({ where: { title } });

  if (existingPosition) {
    return res.status(409).json({ success: false, message: "Position already exists" });
  }

  const newPosition = await prisma.position.create({
    data: { title, description },
  });

  res.status(201).json({ success: true, data: newPosition });
});

// Update a position
export const updatePosition = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID format" });
  }

  const position = await prisma.position.findUnique({ where: { id } });

  if (!position) {
    return res.status(404).json({ success: false, message: "Position not found" });
  }

  const updatedPosition = await prisma.position.update({
    where: { id },
    data: { title, description },
  });

  res.status(200).json({ success: true, data: updatedPosition });
});

// Delete a position
export const deletePosition = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID format" });
  }

  const position = await prisma.position.findUnique({ where: { id } });

  if (!position) {
    return res.status(404).json({ success: false, message: "Position not found" });
  }

  await prisma.position.delete({ where: { id } });

  res.status(200).json({ success: true, message: "Position deleted successfully" });
});
