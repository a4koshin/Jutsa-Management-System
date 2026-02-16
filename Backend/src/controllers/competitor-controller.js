import asyncHandler from "express-async-handler";
import prisma from "../config/db.js";
import { ObjectId } from "mongodb";

/**
 * @controller create a new competitor
 * @route POST /api/competitors
 * @access Public
 * @method POST
 * @description This route is used to create a new competitor
 */

export const registerCompetitor = asyncHandler(async (req, res) => {
  const {
    name,
    number,
    email,
    semester,
    skill,
    idNumber,
    className,
    type,
    projectName,
    technologies,
  } = req.body;

  // Check if all required fields are provided
  if (
    !name ||
    !number ||
    !email ||
    !semester ||
    !skill ||
    !idNumber ||
    !className ||
    !projectName
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Get the current year
  const currentYear = new Date().getFullYear();

 
  const competitorExists = await prisma.competitor.findFirst({
    where: {
      OR: [
        { idNumber: idNumber },
        { email: email },
        { projectName: projectName },
      ],
      createdAt: {
        gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
        lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
      },
    },
  });

  if (competitorExists) {
    res.status(400);
    throw new Error(
      `You are already registered in ${currentYear} with the same email, number, or ID number`
    );
  }

  // Create a new competitor
  const competitor = await prisma.competitor.create({
    data: {
      name,
      number: Number(number),
      email,
      semester,
      className,
      idNumber,
      skill,
      type,
      projectName,
      technologies,
    },
  });

  if (!competitor) {
    res.status(500);
    throw new Error("Failed to register competitor");
  } else {
    res.status(200).json({
      success: true,
      error: null,
      message: "Registered successfully",
      data: competitor,
    });
  }
});
/**
 * @controller getAllCompetitors
 * @description Get all competitors
 * @route GET /api/competitors
 * @access Public
 * @method GET
 */
export const getAllCompetitors = asyncHandler(async (req, res) => {
  try {
    const competitors = await prisma.competitor.findMany();
    res.status(200).json({
      success: true,
      data: competitors,
      total: competitors.length,
    });
  } catch (error) {
    console.error("Error fetching competitors:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Get competitor by ID
export const getCompetitorById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Please use  a valid id");
  }

  const competitor = await prisma.competitor.findUnique({
    where: {
      id,
    },
  });

  if (!competitor) {
    res.status(404);
    throw new Error("Competitor was not found");
  }

  res.status(200).json({
    success: true,
    data: competitor,
  });
});

// Update competitor unique Id
export const updatedCompetitor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    number,
    email,
    semester,
    skill,
    className,
    type,
    projectName,
    technologies,
    status,
  } = req.body;

  if (!ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Please enter a valid id");
  }

  const isCompetitorExists = await prisma.competitor.findUnique({
    where: {
      id,
    },
  });

  if (!isCompetitorExists) {
    res.status(404);
    throw new Error("competitor not found ");
  }

  const updatedCompetitor = await prisma.competitor.update({
    data: {
      name,
      number,
      email,
      semester,
      skill,
      className,
      type,
      projectName,
      technologies,
      status,
    },
    where: {
      id,
    },
  });

  if (!updatedCompetitor) {
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

//End of Competitor Controller

// Delete existing competitor using unique ID
export const deleteCompetitor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Please enter a valid id");
  }

  const competitor = await prisma.competitor.findUnique({
    where: {
      id,
    },
  });

  if (!competitor) {
    res.status(404);
    throw new Error("Unable to find: not registered competitor");
  }

  const deletedComp = await prisma.competitor.delete({
    where: {
      id,
    },
  });

  if (!deletedComp) {
    res.status(400);
    throw new Error("Unable to delete: unexpected error occurred");
  }

  res.status(200).json({
    success: true,
    error: null,
    data: {
      message: "Deleted successfully",
    },
  });
});
