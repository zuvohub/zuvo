import { router } from "expo-router";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import db from "../firestore";

export default function HistoryScreen() {
  const [rides, setRides] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "rides"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rideList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRides(rideList);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ZUVO</Text>
      <Text style={styles.title}>Ride History</Text>

      <ScrollView style={styles.list}>
        {rides.length === 0 ? (
          <Text style={styles.empty}>No rides yet.</Text>
        ) : (
          rides.map((ride) => (
            <View key={ride.id} style={styles.card}>
              <Text style={styles.route}>📍 {ride.pickup}</Text>
              <Text style={styles.route}>🏁 {ride.dropoff}</Text>
              <Text style={styles.price}>${ride.total}</Text>
              <Text style={styles.status}>Status: {ride.status}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
        <Text style={styles.buttonText}>Back Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050505", padding: 24 },
  logo: { color: "#A6FF00", fontSize: 30, fontWeight: "900", marginTop: 20 },
  title: { color: "white", fontSize: 42, fontWeight: "900", marginTop: 20, marginBottom: 20 },
  list: { flex: 1 },
  empty: { color: "white", fontSize: 18, textAlign: "center", marginTop: 50 },
  card: { backgroundColor: "#111111", padding: 20, borderRadius: 20, marginBottom: 14 },
  route: { color: "white", fontSize: 16, marginBottom: 8 },
  price: { color: "#A6FF00", fontSize: 26, fontWeight: "900", marginTop: 8 },
  status: { color: "white", marginTop: 8 },
  button: { backgroundColor: "#A6FF00", padding: 18, borderRadius: 20, alignItems: "center", marginTop: 15 },
  buttonText: { color: "#050505", fontSize: 18, fontWeight: "900" },
});