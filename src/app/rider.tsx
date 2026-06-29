import * as Location from "expo-location";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import BottomNav from "../components/BottomNav";

const suggestions = [
  "LAX Airport",
  "Santa Monica Pier",
  "Dodger Stadium",
  "Crypto.com Arena",
  "Hollywood Walk of Fame",
  "Downtown Los Angeles",
];

export default function RiderScreen() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [locationText, setLocationText] = useState("Location not set");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  async function getCurrentLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Location permission was denied.");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const lat = location.coords.latitude.toFixed(6);
    const lng = location.coords.longitude.toFixed(6);

    setLatitude(lat);
    setLongitude(lng);
    setLocationText(`Lat: ${lat}, Lng: ${lng}`);
    setPickup(`Current GPS location (${lat}, ${lng})`);
  }

  function goToConfirm() {
    if (!pickup || !dropoff) {
      alert("Please enter pickup and destination.");
      return;
    }

    router.push({
      pathname: "/confirm",
      params: { pickup, dropoff, latitude, longitude },
    });
  }

  return (
    <View style={styles.page}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.logo}>ZUVO</Text>
        <Text style={styles.title}>Where to?</Text>

        <View style={styles.mapBox}>
          <Text style={styles.mapTitle}>🗺️ Map Preview</Text>
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

          <Text style={styles.suggestionTitle}>Suggested places</Text>

          {suggestions.map((place) => (
            <TouchableOpacity
              key={place}
              style={styles.suggestion}
              onPress={() => setDropoff(place)}
            >
              <Text style={styles.suggestionText}>📍 {place}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.button} onPress={goToConfirm}>
            <Text style={styles.buttonText}>Confirm Ride</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#050505",
  },
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },
  content: {
    padding: 24,
    paddingBottom: 120,
  },
  logo: {
    color: "#A6FF00",
    fontSize: 28,
    fontWeight: "900",
    marginTop: 20,
  },
  title: {
    color: "white",
    fontSize: 42,
    fontWeight: "900",
    marginTop: 20,
  },
  mapBox: {
    height: 260,
    borderRadius: 28,
    marginTop: 24,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  mapTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 12,
  },
  mapText: {
    color: "#A6FF00",
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
  },
  car: {
    fontSize: 50,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#101010",
    padding: 18,
    borderRadius: 28,
    marginTop: 16,
  },
  locationButton: {
    borderColor: "#A6FF00",
    borderWidth: 1,
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    alignItems: "center",
  },
  locationButtonText: {
    color: "#A6FF00",
    fontWeight: "900",
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "white",
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
    fontSize: 16,
  },
  suggestionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "900",
    marginTop: 8,
    marginBottom: 10,
  },
  suggestion: {
    backgroundColor: "#1A1A1A",
    padding: 14,
    borderRadius: 14,
    marginBottom: 8,
  },
  suggestionText: {
    color: "#A6FF00",
    fontWeight: "800",
  },
  button: {
    backgroundColor: "#A6FF00",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#050505",
    fontSize: 16,
    fontWeight: "900",
  },
});