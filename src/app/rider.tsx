import * as Location from "expo-location";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import BottomNav from "../components/BottomNav";
import ZuvoButton from "../components/ZuvoButton";
import ZuvoCard from "../components/ZuvoCard";
import ZuvoHeader from "../components/ZuvoHeader";
import ZuvoMapPreview from "../components/ZuvoMapPreview";
import ZuvoPlacesInput from "../components/ZuvoPlacesInput";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

export default function RiderScreen() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [locationText, setLocationText] = useState("Location not set");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [dropoffLatitude, setDropoffLatitude] = useState("");
  const [dropoffLongitude, setDropoffLongitude] = useState("");

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
      params: {
        pickup,
        dropoff,
        latitude,
        longitude,
        dropoffLatitude,
        dropoffLongitude,
      },
    });
  }

  return (
    <View style={styles.page}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <ZuvoHeader title="Book a ride" subtitle="Set your pickup and destination" />

        <ZuvoMapPreview locationText={locationText} />

        <ZuvoCard>
          <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
            <Text style={styles.locationButtonText}>Use My Current Location</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="📍 Pickup location"
            placeholderTextColor={colors.mutedText}
            value={pickup}
            onChangeText={setPickup}
          />

          <ZuvoPlacesInput
            value={dropoff}
            onSelect={(place) => {
              setDropoff(place.description);
              setDropoffLatitude(place.latitude ? String(place.latitude) : "");
              setDropoffLongitude(place.longitude ? String(place.longitude) : "");
            }}
          />

          <Text style={styles.helperText}>
            Search real Google places like LAX, Santa Monica, or Dodger Stadium.
          </Text>

          <ZuvoButton title="Confirm Ride" onPress={goToConfirm} />
        </ZuvoCard>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: 120,
  },
  locationButton: {
    borderColor: colors.primary,
    borderWidth: 1,
    padding: spacing.md,
    borderRadius: 18,
    marginBottom: spacing.md,
    alignItems: "center",
  },
  locationButtonText: {
    color: colors.primary,
    fontWeight: typography.bold,
  },
  input: {
    backgroundColor: colors.surfaceLight,
    color: colors.text,
    padding: spacing.md + 2,
    borderRadius: 18,
    marginBottom: spacing.md,
    fontSize: typography.body,
  },
  helperText: {
    color: colors.mutedText,
    fontSize: typography.caption,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
});