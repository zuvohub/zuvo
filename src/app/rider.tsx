import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RiderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ZUVO</Text>
      <Text style={styles.title}>Where to?</Text>

      <View style={styles.map}>
        <Text style={styles.mapText}>🗺️ Los Angeles Map Preview</Text>
        <Text style={styles.car}>🚗</Text>
        <Text style={styles.pin}>📍 Current Location</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.input}>📍 Current location</Text>
        <Text style={styles.input}>🏁 Enter destination</Text>

        <Text style={styles.price}>Estimated ride: $18.40</Text>
        <Text style={styles.split}>Driver earns $16.56 • Zuvo fee $1.84</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/confirm")}>
          <Text style={styles.buttonText}>Confirm Ride</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.back}>← Back home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050505", padding: 24 },
  logo: { color: "#A6FF00", fontSize: 28, fontWeight: "900", marginTop: 20 },
  title: { color: "white", fontSize: 42, fontWeight: "900", marginTop: 20 },
  map: { height: 260, backgroundColor: "#111", borderRadius: 28, marginTop: 24, alignItems: "center", justifyContent: "center" },
  mapText: { color: "#A6FF00", fontSize: 22, fontWeight: "900" },
  car: { fontSize: 50, marginTop: 20 },
  pin: { color: "white", fontSize: 16, marginTop: 10 },
  card: { backgroundColor: "#101010", padding: 18, borderRadius: 28, marginTop: 20 },
  input: { backgroundColor: "#1E1E1E", color: "white", padding: 18, borderRadius: 18, marginBottom: 12, fontSize: 16 },
  price: { color: "#A6FF00", fontSize: 22, fontWeight: "900", marginTop: 10 },
  split: { color: "white", fontSize: 14, marginTop: 6, marginBottom: 18 },
  button: { backgroundColor: "#A6FF00", padding: 18, borderRadius: 20, alignItems: "center" },
  buttonText: { color: "#050505", fontSize: 16, fontWeight: "900" },
  back: { color: "#A6FF00", textAlign: "center", marginTop: 22, fontWeight: "800" },
});