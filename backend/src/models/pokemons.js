import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

const Pokemon = sequelize.define(
  "Pokemon",
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
    imageUrl: {
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

export default Pokemon;
