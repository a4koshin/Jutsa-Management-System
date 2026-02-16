import asyncHandler from "express-async-handler";
import prisma from "../config/db.js";
import { ObjectId } from "mongodb";

/**
 * @controller registerMember
 * @route POST /api/members
 * @access Public
 * @method POST
 * @description This route is used to create a new member
 */
export const registerMember = asyncHandler(async (req, res) => {
  const { name, address, email, semester, studentId, year, position_Id } =
    req.body;

  if (
    !name ||
    !address ||
    !email ||
    !semester ||
    !studentId ||
    !year ||
    !position_Id
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Create a new member
  const member = await prisma.member.create({
    data: {
      name,
      address,
      email,
      semester,
      studentId,
      year,
      position_Id,
    },
  });

  // Send a response
  res.status(201).json({
    success: true,
    message: "Member created successfully",
    data: member,
  });
});

/**
 * @controller getAllMembers
 * @description Get all members
 * @route GET /api/members
 * @access Public
 * @method GET
 */
export const getAllMembers = asyncHandler(async (req, res) => {
  const members = await prisma.member.findMany();
  res.status(200).json({
    success: true,
    data: members,
  });
});

// Get member by ID
export const getMemberById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Please use a valid id");
  }

  const member = await prisma.member.findUnique({
    where: {
      id,
    },
  });

  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  }

  res.status(200).json({
    success: true,
    data: member,
  });
});

// Update member unique Id
export const updateMember = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, address, email, semester, studentId, year, position_Id } =
    req.body;

  if (!ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Please enter a valid id");
  }

  const isMemberExists = await prisma.member.findUnique({
    where: {
      id,
    },
  });

  if (!isMemberExists) {
    res.status(404);
    throw new Error("Member not found");
  }

  const updatedMember = await prisma.member.update({
    data: {
      name,
      address,
      email,
      semester,
      studentId,
      year,
      position_Id,
    },
    where: {
      id,
    },
  });

  if (!updatedMember) {
    res.status(400);
    throw new Error("Unexpected Error while updating");
  }

  res.status(200).json({
    success: true,
    error: null,
    data: {
      message: "Updated successfully",
    },
  });
});

// Delete existing member using unique ID
export const deleteMember = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Please enter a valid id");
  }

  const member = await prisma.member.findUnique({
    where: {
      id,
    },
  });

  if (!member) {
    res.status(404);
    throw new Error("Unable to find: not registered member");
  }

  const deletedMember = await prisma.member.delete({
    where: {
      id,
    },
  });

  if (!deletedMember) {
    res.status(400);
    throw new Error("Unable to delete: unexpected error occurred");
  }

  res.status(200).json({
    success: true,
    error: null,
    message: "Deleted successfully",
    data: deletedMember,
  });
});
