import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function MovieCard({ movie }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/movie/${movie.id}`)}
    >
      {movie.poster_path && (
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
          }}
          style={styles.poster}
        />
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.date}>{movie.release_date}</Text>
        <Text numberOfLines={3} style={styles.overview}>
          {movie.overview || "Sem descrição."}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  poster: {
    width: 100,
    height: 150,
  },
  info: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    color: "gray",
    marginBottom: 5,
  },
  overview: {
    color: "#333",
  },
});
