import { fetchPokemonsData } from "./PublicApi";
import { Filter, Pokemon } from "./interface";

export const pickColor = (type: string) => {
  let color = "";
  switch (type) {
    case "fire":
      color = "red";
      break;
    case "grass":
      color = "green";
      break;
    case "flying":
      color = "#89f";
      break;
    case "water":
      color = "#39f";
      break;
    case "ice":
      color = "#6cf";
      break;
    case "bug":
      color = "#ab2";
      break;
    case "poison":
      color = "#a59";
      break;
    case "dark":
      color = "#754";
      break;
    case "electric":
      color = "#fc3";
      break;
    case "fairy":
      color = "#e9e";
      break;
    case "steel":
      color = "#aab";
      break;
    default:
      color = "#aa9";
  }

  return color;
};

// Function to filter and score data based on given filters
// i Choosed to make filter this way so that more choices will always be shown
export const filterAndScoreData = (
  data: Pokemon[],
  filters: Filter
): Pokemon[] | [] => {
  const { pokemonTypes, pokemonWeight, searchName } = filters;
  let filteredData;
  // Filter the data based on the selected type names and search input
  if (pokemonTypes.length > 0) {
    filteredData = data.filter((pokemon) =>
      pokemon.types.some((type) => pokemonTypes.includes(type.type.name))
    );
  }
  if (searchName.length > 2) {
    filteredData = data.filter(
      (pokemon) => pokemon.name.toLowerCase().includes(searchName.toLowerCase()) // Case-insensitive search
    );
  }
  if (pokemonWeight <= 1200) {
    filteredData = data.filter(
      (pokemon) => pokemon.weight < pokemonWeight // Case-insensitive search
    );
  }

  // Calculate a score for each Pokémon based on the matched conditions
  if (filteredData) {
    const scoredData =
      filteredData &&
      filteredData.map((pokemon) => {
        let score = 0;
        if (pokemonTypes.length === 0) {
          score += 1; // If no types are selected, give a bonus score
        } else {
          score += pokemon.types.filter((type) =>
            pokemonTypes.includes(type.type.name)
          ).length;
        }

        if (pokemon.weight <= pokemonWeight) {
          score += 1; // If weight condition is matched, give a bonus score
        }

        return { ...pokemon, score };
      });

    // Sort the data based on the scores in descending order
    scoredData.sort((a, b) => b.score - a.score);
    return scoredData;
  }
  return [];
};

// to Optimize API call, once we load for the first time, we store the data in local Storage
export const getInitialData = async (): Promise<Pokemon[]> => {
  return new Promise((res, _) => {
    const ls = localStorage.getItem("data");
    if (ls) {
      res(JSON.parse(ls));
    } else {
      fetchPokemonsData().then(res);
    }
  });
};
