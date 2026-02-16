import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log(process.env.DATABASE_URL, "Database Connected");

export default prisma;
// This file is for database connection
