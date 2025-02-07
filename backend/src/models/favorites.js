import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

const Favorite = sequelize.define(
  "Favorite",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    pokemonIds: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    timestamps: true,
  }
);

export default Favorite;
