import Constants from "expo-constants";

const API_KEY = Constants.expoConfig.extra.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function searchMovies(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return [];
  }
}

export async function getMovieDetails(movieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme:", error);
    return null;
  }
}
