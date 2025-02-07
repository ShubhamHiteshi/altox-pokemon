import { faker } from "@faker-js/faker";
import { db } from "../models/index.js";

export const generateRandomOrganizations = async (req, res) => {
  try {
    const organizations = [];

    for (let i = 0; i < 10; i++) {
      organizations.push({
        name: faker.company.name(),
        contactEmail: faker.internet.email(),
      });
    }
    await db.Organization.bulkCreate(organizations);
    res.status(201).json({
      message: "10 random organizations created successfully!",
      organizationsCreated: organizations.length,
    });
  } catch (error) {
    console.error("Error generating organizations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await db.Organization.findAll();

    res.status(201).json({
      message: "Organizations fetched successfully!",
      organizations,
    });
  } catch (error) {
    console.error("Error fetching organizations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
