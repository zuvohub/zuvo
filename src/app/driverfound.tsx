import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DriverFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ZUVO</Text>
      <Text style={styles.title}>🚖 New Ride Request</Text>

      <View style={styles.card}>
        <Text style={styles.row}>📍 Pickup: Hollywood Blvd</Text>
        <Text style={styles.row}>🏁 Drop-off: Santa Monica Pier</Text>
        <Text style={styles.price}>You earn: $16.56</Text>
        <Text style={styles.small}>Rider paid: $18.40 • Zuvo fee: $1.84</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/trip")}>
        <Text style={styles.buttonText}>Accept Ride</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/driver")}>
        <Text style={styles.back}>Decline Ride</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050505", padding: 24, justifyContent: "center" },
  logo: { color: "#A6FF00", fontSize: 28, fontWeight: "900", marginBottom: 20 },
  title: { color: "white", fontSize: 38, fontWeight: "900", marginBottom: 24 },
  card: { backgroundColor: "#111111", padding: 24, borderRadius: 24, marginBottom: 24 },
  row: { color: "white", fontSize: 18, marginBottom: 12 },
  price: { color: "#A6FF00", fontSize: 30, fontWeight: "900", marginTop: 15 },
  small: { color: "white", fontSize: 14, marginTop: 8 },
  button: { backgroundColor: "#A6FF00", padding: 18, borderRadius: 20, alignItems: "center" },
  buttonText: { color: "#050505", fontSize: 18, fontWeight: "900" },
  back: { color: "#A6FF00", textAlign: "center", marginTop: 20, fontSize: 16, fontWeight: "800" },
});