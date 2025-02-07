import express from "express";
import cors from "cors";
import "dotenv/config";
import { sequelize } from "./config/dbConfig.js";
import apiRoutes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
console.log("**** -- Checking ");
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

app.use("/api", apiRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected and synchronized");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Database connection error:", err));
