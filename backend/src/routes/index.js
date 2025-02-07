import { Router } from "express";
import {
  generateRandomOrganizations,
  getAllOrganizations,
} from "../controllers/organizationControllers.js";
import {
  generateUsersForOrganizations,
  getCurrentUser,
  loginUser,
  registerUser,
} from "../controllers/userControllers.js";
import {
  generatePokemon,
  getAllPokemonByOrganization,
} from "../controllers/pokemonControllers.js";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  addFavoritePokemon,
  removeFavoritePokemon,
} from "../controllers/favoritePokemonControllers.js";

const router = Router();
console.log("*********", "this is new");
// auth router
router.post("/login", loginUser);
router.post("/register-user", registerUser);

// Organization router
router.post("/organization/generate", generateRandomOrganizations);

router.get("/organizations", getAllOrganizations);

// Pokemon router
router.post("/pokemon/generate", generatePokemon);
router.get("/pokemons", authenticate, getAllPokemonByOrganization);

// user router
router.post("/users/generate-users", generateUsersForOrganizations);
router.get("/me", authenticate, getCurrentUser);

// Favorite pokemon router

router.post("/add-favorite-pokemon", authenticate, addFavoritePokemon);
router.post("/remove-favorite-pokemon", authenticate, removeFavoritePokemon);

export default router;
