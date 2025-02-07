import { db } from "../models/index.js";

export const addFavoritePokemon = async (req, res) => {
  const { pokemonId } = req.body;

  try {
    const user = req?.user;
    if (!user || !pokemonId) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const intPokemonId = parseInt(pokemonId, 10);
    if (isNaN(intPokemonId)) {
      return res.status(400).json({ error: "Invalid pokemon ID" });
    }

    const userRecord = await db.User.findOne({
      where: { email: user?.email },
      attributes: ["id"],
    });

    if (!userRecord) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = userRecord.id;

    let favorite = await db.Favorite.findOne({ where: { userId } });

    if (favorite) {
      const updatedPokemonIds = new Set(favorite.pokemonIds);
      updatedPokemonIds.add(intPokemonId);
      await favorite.update({ pokemonIds: Array.from(updatedPokemonIds) });

      return res.status(200).json({
        message: "Pokemon added to favorites",
        favorite,
      });
    } else {
      favorite = await db.Favorite.create({
        userId,
        pokemonIds: [intPokemonId],
      });

      return res.status(201).json({
        message: "Favorite list created and Pokemon added",
        favorite,
      });
    }
  } catch (error) {
    console.error("Error adding favorite Pokemon:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const removeFavoritePokemon = async (req, res) => {
  const { pokemonId } = req.body;

  try {
    const user = req?.user;
    if (!user || !pokemonId) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const intPokemonId = parseInt(pokemonId, 10);
    if (isNaN(intPokemonId)) {
      return res.status(400).json({ error: "Invalid pokemon ID" });
    }

    const userRecord = await db.User.findOne({
      where: { email: user?.email },
      attributes: ["id"],
    });

    if (!userRecord) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = userRecord.id;

    const favorite = await db.Favorite.findOne({ where: { userId } });

    if (!favorite) {
      return res
        .status(404)
        .json({ message: "No favorites found for this user" });
    }

    const updatedPokemonIds = favorite.pokemonIds.filter(
      (id) => id !== intPokemonId
    );

    if (updatedPokemonIds.length === 0) {
      await favorite.destroy();
      return res
        .status(200)
        .json({ message: "Favorite list deleted as no Pokémon remained" });
    } else {
      await favorite.update({ pokemonIds: updatedPokemonIds });
      return res.status(200).json({
        message: "Pokemon removed from favorites",
        favorite,
      });
    }
  } catch (error) {
    console.error("Error removing favorite Pokemon:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
