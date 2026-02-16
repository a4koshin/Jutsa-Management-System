import AsyncHandler from "express-async-handler";
import prisma from "../config/db.js";

export const getAllCandidates = AsyncHandler(async (req, res) => {
  const candidate = await prisma.candidate.findMany();
  res.json(candidate);
});

export const getCandidateById = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const candidate = await prisma.candidate.findUnique({
    where: {
      id: id,
    },
  });

  if (!candidate) {
    res.status(404);
    throw new Error("not found");
  }

  res.status(200).json({
    success: true,
    data: candidate,
  });
});

// ✅ Register a new candidate
export const registerCandidate = AsyncHandler(async (req, res) => {
  const {
    studentID,
    name,
    number,
    email,
    gpa,
    department,
    semester,
    className,
    failedCourse,
    financeDue,
    experience,
    campaignPlan,
  } = req.body;

  console.log("Received Data:", req.body);

  if (
    !studentID ||
    !name ||
    !number ||
    !email ||
    !gpa ||
    !department ||
    !semester ||
    !className ||
    !failedCourse ||
    !financeDue ||
    !experience ||
    !campaignPlan
  ) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required" });
  }

  const candidateExists = await prisma.candidate.findUnique({
    where: { studentID },
  });

  if (candidateExists) {
    return res
      .status(400)
      .json({ success: false, error: "Candidate already exists" });
  }

  const candidate = await prisma.candidate.create({
    data: {
      studentID,
      name,
      number: parseInt(number),
      email,
      gpa: parseFloat(gpa),
      department,
      semester,
      className,
      failedCourse,
      financeDue,
      experience,
      campaignPlan,
    },
  });

  console.log("Candidate Registered Successfully");

  res.status(201).json({
    success: true,
    data: candidate,
    message: "You registered successfully",
  });
});

export const updateCandidate = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    number,
    email,
    gpa,
    faculty,
    yearOfStudy,
    semester,
    className,
    isFinanceRequired,
    isExamRequired,
    experience,
    campaignPlan,
  } = req.body;

  const candidate = await prisma.candidate.update({
    where: {
      id: id,
    },
    data: {
      name,
      number,
      email,
      gpa,
      faculty,
      yearOfStudy,
      semester,
      className,
      isFinanceRequired,
      isExamRequired,
      experience,
      campaignPlan,
    },
  });

  res.status(200).json({
    success: true,
    data: candidate,
    message: "Candidate updated",
  });
});

export const deleteCandidate = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const candidate = await prisma.candidate.delete({
    where: {
      id: id,
    },
  });

  res.status(200).json({
    success: true,
    data: candidate,
    message: "Candidate deleted successfully",
  });
});
