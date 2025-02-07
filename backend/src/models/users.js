import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organizationId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Organizations",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default User;
