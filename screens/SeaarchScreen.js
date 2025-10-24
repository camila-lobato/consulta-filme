// screens/SearchScreen.js
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from "react-native";
import { searchMovies, IMAGE_BASE } from "../api/tmdb";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const doSearch = useCallback(async (q, p = 1, append = false) => {
    if (!q || q.trim().length === 0) {
      setMovies([]);
      setError("");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await searchMovies(q, p);
      if (append) {
        setMovies(prev => [...prev, ...data.results]);
      } else {
        setMovies(data.results);
      }
      setPage(data.page || 1);
      setTotalPages(data.total_pages || 1);
      if (!data.results || data.results.length === 0) {
        setError("Nenhum resultado encontrado.");
      }
    } catch (err) {
      setError(err.message || "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearchPress = () => {
    setPage(1);
    doSearch(query, 1, false);
  };

  const loadMore = () => {
    if (loading) return;
    if (page >= totalPages) return;
    const next = page + 1;
    doSearch(query, next, true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Details", { movieId: item.id })}
    >
      {item.poster_path ? (
        <Image source={{ uri: `${IMAGE_BASE}${item.poster_path}` }} style={styles.poster} />
      ) : (
        <View style={[styles.poster, styles.noPoster]}>
          <Text style={{ fontSize: 12 }}>Sem poster</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.release_date || "Data desconhecida"}</Text>
        <Text numberOfLines={3} style={styles.overview}>{item.overview || "Sem sinopse."}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Digite o nome do filme..."
          value={query}
          onChangeText={setQuery}
          style={styles.input}
          onSubmitEditing={handleSearchPress}
          returnKeyType="search"
        />
        <Button title="Buscar" onPress={handleSearchPress} />
      </View>

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={movies}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={() => (!loading && !error ? <Text style={{marginTop:20}}>Nenhum filme ainda. Faça uma busca.</Text> : null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#fff" },
  searchRow: { flexDirection: "row", gap: 8, marginBottom: 12, alignItems: "center" },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 6 },
  card: { flexDirection: "row", marginVertical: 8, backgroundColor: "#f7f7f7", borderRadius: 8, overflow: "hidden", elevation: 2 },
  poster: { width: 100, height: 150 },
  noPoster: { justifyContent: "center", alignItems: "center", backgroundColor: "#eee" },
  info: { flex: 1, padding: 8 },
  title: { fontSize: 16, fontWeight: "bold" },
  date: { fontSize: 12, color: "#666", marginBottom: 6 },
  overview: { fontSize: 13, color: "#333" },
  error: { color: "red", marginVertical: 8, textAlign: "center" },
});
