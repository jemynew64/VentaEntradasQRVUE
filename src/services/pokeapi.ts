import axios from "axios";

export default async function fetchPokemonData(pokemonName: string) {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    const data = response.data;
    const errorMessage = ""

    // 🔹 Extraemos lo que queremos
    const abilities = data.abilities.map((item: any) => item.ability.name);
    const moves = data.moves.map((item: any) => item.move.name);
    const sprite = data.sprites.front_default; // Imagen del Pokémon
    const types = data.types.map((item: any) => item.type.name); // 👈 aquí está el tipo

    // 🔹 Devolvemos solo lo útil
    return {
      name: data.name,
      abilities,
      moves,
      types,
      sprite,
    };
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return { error: `No se encontró el Pokémon "${pokemonName}"` };
  }
}
