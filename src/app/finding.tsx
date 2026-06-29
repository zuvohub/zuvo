import { router } from "expo-router";
import { collection, limit, onSnapshot, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import db from "../firestore";

export default function FindingScreen() {
  useEffect(() => {
    const ridesQuery = query(
      collection(db, "rides"),
      where("status", "==", "accepted"),
      limit(1)
    );

    const unsubscribe = onSnapshot(ridesQuery, (snapshot) => {
      if (!snapshot.empty) {
        router.push("/trip");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ZUVO</Text>
      <Text style={styles.title}>Finding your driver...</Text>
      <Text style={styles.circle}>🚗</Text>
      <Text style={styles.subtitle}>Waiting for a driver to accept your ride.</Text>

      <TouchableOpacity onPress={() => router.push("/confirm")}>
        <Text style={styles.back}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050505", padding: 24, justifyContent: "center", alignItems: "center" },
  logo: { color: "#A6FF00", fontSize: 28, fontWeight: "900", marginBottom: 40 },
  title: { color: "white", fontSize: 36, fontWeight: "900", textAlign: "center" },
  circle: { fontSize: 80, marginVertical: 40 },
  subtitle: { color: "white", fontSize: 18, marginBottom: 40, textAlign: "center" },
  back: { color: "#A6FF00", marginTop: 22, fontWeight: "800" },
});