import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

const Organization = sequelize.define(
  "Organization",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Organization;
