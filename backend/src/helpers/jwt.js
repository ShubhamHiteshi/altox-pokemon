import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";
const TOKEN_EXPIRATION = 7 * 24 * 60 * 60;

export const generateToken = (email) => {
  if (!SECRET_KEY) {
    throw new Error("Missing SECRET_KEY environment variable");
  }
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
};

export const verifyToken = (token) => {
  if (!SECRET_KEY) {
    throw new Error("Missing SECRET_KEY environment variable");
  }
  return jwt.verify(token, SECRET_KEY);
};
