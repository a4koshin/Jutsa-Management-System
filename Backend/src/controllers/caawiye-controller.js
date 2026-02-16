import asyncHandler from "express-async-handler";
import prisma from "../config/db.js";

// @desc    Get all users
// @route   GET /api/users
// @access  Public

export const getCaawiyeSupport = asyncHandler(async (req, res) => {
  const caawiye = await prisma.caawiye.findMany();
  res.json(caawiye);
});

// @desc    Get caawiye by ID

export const getCaawiyeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const caawiye = await prisma.caawiye.findUnique({
    where: {
      id: id,
    },
  });

  if (!caawiye) {
    res.status(404);
    throw new Error("not found");
  }

  res.status(200).json({
    success: true,
    data: caawiye,
  });
});

// @desc    Create a new caawiye
// @route   POST /api/caawiye

export const registerCaawiye = asyncHandler(async (req, res) => {
  const {
    id,
    name,
    number,
    semester,
    className,
    password,
    problems,
    solutions,
    status,
  } = req.body;

  const caawiye = await prisma.caawiye.create({
    data: {
      id,
      name,
      number: parseInt(number),
      semester,
      className,
      password,
      problems,
      solutions,
      status,
    },
  });

  if (!caawiye) {
    res.status(500);
    throw new Error("Failed to register caawiye");
  } else {
    res.status(200).json({
      success: true,
      error: null,
      message: "Registered successfully",
      data: caawiye,
    });
  }
});

// @desc    Update caawiye
// @route   PUT /api/caawiye/:id
// @access  Private/Admin

export const updateCaawiye = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    number,
    semester,
    className,
    password,
    problems,
    solutions,
    status,
  } = req.body;

  const caawiye = await prisma.caawiye.update({
    where: {
      id,
    },
    data: {
      name,
      number,
      semester,
      className,
      password,
      problems,
      solutions,
      status,
    },
  });

  if (!caawiye) {
    res.status(500);
    throw new Error("Failed to update caawiye");
  } else {
    res.status(200).json({
      success: true,
      error: null,
      message: "Updated successfully",
      data: caawiye,
    });
  }
});

// @desc    Delete caawiye
// @route   DELETE /api/caawiye/:id
// @access  Private/Admin

export const deleteCaawiye = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const caawiye = await prisma.caawiye.delete({
    where: {
      id,
    },
  });

  if (!caawiye) {
    res.status(500);
    throw new Error("Failed to delete caawiye");
  } else {
    res.status(200).json({
      success: true,
      error: null,
      message: "Deleted successfully",
      data: caawiye,
    });
  }
});
