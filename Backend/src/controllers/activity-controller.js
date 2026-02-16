import AsyncHandler from "express-async-handler";
import prisma from "../config/db.js";

// @desc    Get all users
// @route   GET /api/users
// @access  Public

export const getAllActivities = AsyncHandler(async (req, res) => {
  const activity = await prisma.activity.findMany();

  res.status(200).json({
    success: true,
    data: activity,
  });
});

// @desc    Get activity by ID
// @route   GET /api/activity/:id
// @access  Public

export const getActivityById = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const activity = await prisma.activity.findUnique({
    where: {
      id: id,
    },
  });

  if (!activity) {
    res.status(404);
    throw new Error("not found");
  }

  res.status(200).json({
    success: true,
    data: activity,
  });
});

// @desc    Create a new activity
// @route   POST /api/activity
// @access  Private

export const registerActivity = AsyncHandler(async (req, res) => {
  const { title, description, date, speaker, location, type } = req.body;

  // Check if all required fields are provided
  if (!title || !description || !date || !speaker || !location || !type) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  const activity = await prisma.activity.create({
    data: {
      title,
      description,
      date: new Date(date),
      speaker,
      location,
      type,
    },
  });

  res.status(201).json({
    success: true,
    data: activity,
  });
});

// @desc    Update activity

export const updateActivity = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, date, speaker, location, type } = req.body;

  const activity = await prisma.activity.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
      date: new Date(date),
      speaker,
      location,
      type,
    },
  });

  res.status(200).json({
    success: true,
    data: activity,
    message: "Activity updated",
  });
});

// @desc    Delete activity
// @route   DELETE /api/activity/:id
// @access  Private

export const deleteActivity = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.activity.delete({
    where: {
      id: id,
    },
  });

  res.status(200).json({
    success: true,
    message: "Activity deleted Successfully",
  });
});
