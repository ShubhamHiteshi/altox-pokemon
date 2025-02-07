import axios from "axios";
import { db } from "../models/index.js";

export const generatePokemon = async (req, res) => {
  try {
    const organizations = await db.Organization.findAll();
    if (organizations.length === 0) {
      return res.status(400).json({ error: "No organizations found" });
    }

    const orgIds = organizations.map((org) => org.id);

    const fetchPokemon = async (id) => {
      try {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon-form/${id}/`;
        const response = await axios.get(apiUrl);
        const { name, sprites } = response.data;

        return {
          name,
          imageUrl: sprites.front_default,
          organizationId: orgIds[Math.floor(Math.random() * orgIds.length)],
        };
      } catch (error) {
        console.warn(`Failed to fetch Pokémon ID ${id}:`, error.message);
        return null;
      }
    };

    const pokemonPromises = Array.from({ length: 200 }, (_, i) =>
      fetchPokemon(i + 1)
    );
    const pokemonData = (await Promise.all(pokemonPromises)).filter(Boolean);

    if (pokemonData.length > 0) {
      await db.Pokemon.bulkCreate(pokemonData);
    }

    res.status(201).json({
      message: "Pokémon generated successfully!",
      totalPokemons: pokemonData.length,
    });
  } catch (error) {
    console.error("Error generating Pokémon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllPokemonByOrganization = async (req, res) => {
  try {
    const user = req?.user;

    // Fetch user info
    const userInfo = await db.User.findOne({
      where: { email: user?.email },
    });

    if (!userInfo) {
      return res.status(404).json({ error: "User not found" });
    }

    const { page = 1, limit = 10 } = req?.query;
    const offset = (page - 1) * limit;

    const favorite = await db.Favorite.findOne({
      where: { userId: userInfo.id },
      attributes: ["pokemonIds"],
    });

    const favoritePokemonIds = favorite
      ? new Set(favorite.pokemonIds)
      : new Set();

    const { count, rows: pokemons } = await db.Pokemon.findAndCountAll({
      where: { organizationId: userInfo?.organizationId },
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    const modifiedPokemons = pokemons.map((pokemon) => ({
      ...pokemon.toJSON(),
      isLiked: favoritePokemonIds.has(pokemon.id),
    }));

    res.status(200).json({
      message: "Pokémon fetched successfully!",
      total: count,
      page: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
      pokemons: modifiedPokemons,
    });
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
