import asyncHandler from "express-async-handler";
import prisma from "../config/db.js";
import { ObjectId } from "mongodb";

//Registering  A sport
export const registerSport = asyncHandler(async (req, res) => {
    const { monitorName, monitorNumber, className, description, amount } = req.body;

    if (!monitorName || !monitorNumber || !className || !description || !amount) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const sport = await prisma.sport.create({
      data: {
        monitorName,
        monitorNumber,
        className,
        description,
        amount: Number(amount),
      },
    });

    if (!sport) {
      res.status(501);
      throw new Error("Sport not created");
    }

    res.status(201).json({
      success: true,
      error: null,
      message: "Register successfully",
      data: sport,
    });
  });

  // read All sports information 
  export const getAllSports = asyncHandler(async (req, res) => {
    const sports = await prisma.sport.findMany();

    res.status(200).json({
      success: true,
      error: null,
      data: sports,
    });
  });

  // read single sport information 
  export const getSingleSport = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const sport = await prisma.sport.findUnique({
      where: {
        id,
      },
    });

    if (!sport) {
      res.status(404);
      throw new Error("Unable to find: No sport found");
    }

    res.status(200).json({
      success: true,
      error: null,
      data: sport,
    });
  });

  // Deleting a sport using unique ID

export const deleteSport = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Please provide a valid id");
    }

    const deletedSport = await prisma.sport.delete({
      where: {
        id,
      },
    });

    if (!deletedSport) {
      res.status(501);
      throw new Error("Unable to delete: unexpected error occurred");
    }

    res.status(200).json({
      success: true,
      error: null,
      message: "Deleted successfully",
      data: deletedSport,
    });
  });


// Update Sport using unique ID

export const updateSport = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { monitorName, monitorNumber, className, description, amount } = req.body;

    if (!ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Please provide a valid id");
    }

    const isSportExists = await prisma.sport.findUnique({
      where: {
        id,
      },
    });

    if (!isSportExists) {
      res.status(404);
      throw new Error("Unable to find: No sport found");
    }

    const updatedSport = await prisma.sport.update({
      data: {
        monitorName: monitorName,
        monitorNumber: monitorNumber,
        className: className,
        description: description,
        amount: Number(amount),
      },
      where: {
        id,
      },
    });

    if (!updatedSport) {
      res.status(501);
      throw new Error("Unable to update: unexpected error occurred");
    }

    res.status(200).json({
      success: true,
      error: null,
      message: "Updated successfully",
      data: updatedSport,
    });
  });