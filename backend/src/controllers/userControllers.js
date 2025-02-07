import { faker } from "@faker-js/faker";
import { db } from "../models/index.js";
import { generateToken } from "../helpers/jwt.js";

export const generateUsersForOrganizations = async (req, res) => {
  try {
    const organizations = await db.Organization.findAll();
    const totalUsers = [];

    for (const organization of organizations) {
      for (let i = 0; i < 10; i++) {
        const userEmail = faker.internet.email();
        const userPassword = faker.internet.password();

        totalUsers.push({
          email: userEmail,
          password: userPassword,
          organizationId: organization.id,
        });
      }
    }

    await db.User.bulkCreate(totalUsers);

    res.status(201).json({
      message: "Random users created successfully!",
      userCreated: totalUsers.length,
    });
  } catch (error) {
    console.error("Error generating users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const email = req.user?.email;
    const user = await db.User.findOne({
      where: { email },
      include: {
        model: db.Organization,
        attributes: ["id", "name"],
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User fetched Successfully", user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      message: "Failed to fetch user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Invalid email" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = generateToken(email);

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const registerUser = async (req, res) => {
  const { email, password, organizationId } = req.body;

  try {
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const orgId = parseInt(organizationId, 10);
    if (isNaN(orgId)) {
      return res.status(400).json({ error: "Invalid organization ID" });
    }

    await db.User.create({
      email,
      password,
      organizationId: orgId,
    });

    res.status(201).json({
      message: "User registered successfully, please login.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
