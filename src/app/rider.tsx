import * as Location from "expo-location";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RiderScreen() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [locationText, setLocationText] = useState("Location not set");

  async function getCurrentLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Location permission was denied.");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const latitude = location.coords.latitude.toFixed(4);
    const longitude = location.coords.longitude.toFixed(4);

    setLocationText(`Lat: ${latitude}, Lng: ${longitude}`);
    setPickup(`Current GPS location (${latitude}, ${longitude})`);
  }

  function goToConfirm() {
    if (!pickup || !dropoff) {
      alert("Please enter pickup and destination.");
      return;
    }

    router.push({
      pathname: "/confirm",
      params: { pickup, dropoff },
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ZUVO</Text>
      <Text style={styles.title}>Where to?</Text>

      <View style={styles.map}>
        <Text style={styles.mapText}>📍 {locationText}</Text>
        <Text style={styles.car}>🚗</Text>
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
          <Text style={styles.locationButtonText}>Use My Current Location</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="📍 Pickup location"
          placeholderTextColor="#888"
          value={pickup}
          onChangeText={setPickup}
        />

        <TextInput
          style={styles.input}
          placeholder="🏁 Destination"
          placeholderTextColor="#888"
          value={dropoff}
          onChangeText={setDropoff}
        />

        <TouchableOpacity style={styles.button} onPress={goToConfirm}>
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
  map: { height: 230, backgroundColor: "#111", borderRadius: 28, marginTop: 24, alignItems: "center", justifyContent: "center", padding: 20 },
  mapText: { color: "#A6FF00", fontSize: 18, fontWeight: "900", textAlign: "center" },
  car: { fontSize: 50, marginTop: 20 },
  card: { backgroundColor: "#101010", padding: 18, borderRadius: 28, marginTop: 20 },
  locationButton: { borderColor: "#A6FF00", borderWidth: 1, padding: 16, borderRadius: 18, marginBottom: 12, alignItems: "center" },
  locationButtonText: { color: "#A6FF00", fontWeight: "900" },
  input: { backgroundColor: "#1E1E1E", color: "white", padding: 18, borderRadius: 18, marginBottom: 12, fontSize: 16 },
  button: { backgroundColor: "#A6FF00", padding: 18, borderRadius: 20, alignItems: "center", marginTop: 8 },
  buttonText: { color: "#050505", fontSize: 16, fontWeight: "900" },
  back: { color: "#A6FF00", textAlign: "center", marginTop: 22, fontWeight: "800" },
});