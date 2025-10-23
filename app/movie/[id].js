import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getMovieDetails } from "../../services/tmdb";

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function loadMovie() {
      const data = await getMovieDetails(id);
      setMovie(data);
    }
    loadMovie();
  }, [id]);

  if (!movie) {
    return <ActivityIndicator size="large" color="#007BFF" style={{ flex: 1 }} />;
  }

  return (
    <ScrollView style={styles.container}>
      {movie.poster_path && (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.poster}
        />
      )}
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.date}>Lançamento: {movie.release_date}</Text>
      <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)} / 10</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  poster: {
    width: "100%",
    height: 400,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    color: "gray",
  },
  rating: {
    fontSize: 16,
    marginVertical: 5,
  },
  overview: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 22,
  },
});
