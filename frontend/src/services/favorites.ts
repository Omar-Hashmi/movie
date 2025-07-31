// src/services/favorites.ts
import api from "./axios";

export async function addToFavorites(movie: {
  id: number | string;
  title: string;
  poster_path?: string;
  overview?: string;
}) {
  try {
    const payload = {
      id: movie.id.toString(),
      title: movie.title,
      poster_path: movie.poster_path || "",
      overview: movie.overview || "",
    };
    const response = await api.post("/favorites/add", payload);
    return response.data; // { message, favorites }
  } catch (error: any) {
    console.error("Failed to add favorite:", error.response?.data || error.message);
    throw error;
  }
}
