import Organization from "./organizations.js";
import { sequelize } from "../config/dbConfig.js";
import User from "./users.js";
import Pokemon from "./pokemons.js";
import Favorite from "./favorites.js";

Organization.hasMany(User, {
  foreignKey: "organizationId",
  onDelete: "CASCADE",
});

User.belongsTo(Organization, {
  foreignKey: "organizationId",
});

Organization.hasMany(Pokemon, {
  foreignKey: "organizationId",
  onDelete: "CASCADE",
});

Pokemon.belongsTo(Organization, {
  foreignKey: "organizationId",
});

User.hasOne(Favorite, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Favorite.belongsTo(User, {
  foreignKey: "userId",
});

export const db = {
  sequelize,
  User,
  Organization,
  Pokemon,
  Favorite,
};
