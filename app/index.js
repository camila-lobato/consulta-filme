import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import { searchMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Digite um nome de filme.");
      return;
    }

    setError("");
    setLoading(true);
    const results = await searchMovies(query);
    setMovies(results);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do filme..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Buscar" onPress={handleSearch} />

      {loading && <ActivityIndicator size="large" color="#007BFF" />}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#E6F4FE",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});
