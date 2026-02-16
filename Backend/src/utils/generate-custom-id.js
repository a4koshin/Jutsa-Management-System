import prisma from "../../config/db.js";

let counter = 0;

async function generateCustomId() {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // "01", "02", etc.
    const year = now.getFullYear().toString().slice(-2);  // Get the last two digits of the year (e.g., 24 for 2024)
    const uniquePart = (counter++).toString().padStart(3, '0'); // "001", "002", etc.

    const customId = `JT${year}-${month}-${uniquePart}`; // Ensure this is a string

    // Check if the ID already exists in the database
    const existingRecord = await prisma.finance.findUnique({
        where: { id: customId },
    });

    if (existingRecord) {
        return generateCustomId(); // Recursively generate a new ID
    }

    return customId; // Return the ID as a string
}

export default  generateCustomId;
