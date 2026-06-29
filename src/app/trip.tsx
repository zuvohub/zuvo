import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TripScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ZUVO</Text>
      <Text style={styles.title}>Trip in Progress</Text>

      <View style={styles.mapBox}>
        <Text style={styles.mapText}>🚗 Driver is on the way</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.row}>Driver: Marcus</Text>
        <Text style={styles.row}>Car: Toyota Camry • 7ABC123</Text>
        <Text style={styles.row}>Destination: Santa Monica Pier</Text>
        <Text style={styles.price}>Fare: $18.40</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/complete")}>
        <Text style={styles.buttonText}>Complete Trip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050505", padding: 24 },
  logo: { color: "#A6FF00", fontSize: 28, fontWeight: "900", marginTop: 20 },
  title: { color: "white", fontSize: 40, fontWeight: "900", marginTop: 20 },
  mapBox: { height: 260, backgroundColor: "#111", borderRadius: 28, marginTop: 24, alignItems: "center", justifyContent: "center" },
  mapText: { color: "#A6FF00", fontSize: 22, fontWeight: "900" },
  card: { backgroundColor: "#101010", padding: 20, borderRadius: 28, marginTop: 20 },
  row: { color: "white", fontSize: 17, marginBottom: 12 },
  price: { color: "#A6FF00", fontSize: 24, fontWeight: "900", marginTop: 8 },
  button: { backgroundColor: "#A6FF00", padding: 18, borderRadius: 20, alignItems: "center", marginTop: 24 },
  buttonText: { color: "#050505", fontSize: 18, fontWeight: "900" },
});