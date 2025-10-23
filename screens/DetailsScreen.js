// screens/DetailsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image, ScrollView } from "react-native";
import { getMovieDetails, IMAGE_BASE } from "../api/tmdb";

export default function DetailsScreen({ route }) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getMovieDetails(movieId);
        if (mounted) setMovie(data);
      } catch (err) {
        setError(err.message || "Erro ao carregar detalhes.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [movieId]);

  if (loading) return <ActivityIndicator size="large" style={{flex:1, justifyContent:'center'}} />;
  if (error) return <View style={styles.center}><Text style={{color:'red'}}>{error}</Text></View>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {movie.poster_path ? (
        <Image source={{ uri: `${IMAGE_BASE}${movie.poster_path}` }} style={styles.poster} />
      ) : (
        <View style={[styles.poster, styles.noPoster]}><Text>Sem poster</Text></View>
      )}

      <Text style={styles.title}>{movie.title} ({movie.release_date ? movie.release_date.split("-")[0] : "—"})</Text>
      {movie.tagline ? <Text style={styles.tagline}>{movie.tagline}</Text> : null}

      <View style={styles.row}>
        <Text style={styles.label}>Avaliação:</Text>
        <Text>{movie.vote_average} / 10 ({movie.vote_count} votes)</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Duração:</Text>
        <Text>{movie.runtime ? movie.runtime + " min" : "—"}</Text>
      </View>

      <Text style={styles.heading}>Sinopse</Text>
      <Text style={styles.overview}>{movie.overview || "Sem sinopse disponível."}</Text>

      <Text style={styles.heading}>Gêneros</Text>
      <Text>{movie.genres && movie.genres.length ? movie.genres.map(g => g.name).join(", ") : "—"}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, alignItems: "center", backgroundColor: "#fff" },
  poster: { width: 300, height: 450, borderRadius: 8, marginBottom: 12 },
  noPoster: { justifyContent: "center", alignItems: "center", backgroundColor: "#eee" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 6 },
  tagline: { fontStyle: "italic", color: "#555", marginBottom: 8 },
  row: { flexDirection: "row", gap: 6, marginBottom: 6 },
  label: { fontWeight: "bold", marginRight: 6 },
  heading: { marginTop: 12, fontWeight: "bold" },
  overview: { marginTop: 6, textAlign: "justify" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }
});
