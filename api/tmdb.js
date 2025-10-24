// api/tmdb.js
import Constants from "expo-constants";

const API_KEY =
  // tenta ler de expoConfig (Expo SDK recente)
  Constants.expoConfig?.extra?.TMDB_API_KEY ||
  // fallback para manifest (versões antigas)
  Constants.manifest?.extra?.TMDB_API_KEY ||
  // fallback para variáveis de ambiente (se você usar algo assim)
  process.env.TMDB_API_KEY ||
  "";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
<<<<<<< HEAD
console.log("API KEY carregada:", API_KEY);
=======
>>>>>>> 42b5d6edb0519c16c7b7890027324ac578ae5b0a

async function searchMovies(query, page = 1) {
  if (!query) return { results: [], page: 1, total_pages: 1 };
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);
  return res.json();
}

async function getMovieDetails(movieId) {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erro ao buscar detalhes: ${res.status}`);
  return res.json();
}

export { searchMovies, getMovieDetails, IMAGE_BASE };
