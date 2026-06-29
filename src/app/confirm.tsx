import { router, useLocalSearchParams } from "expo-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import db from "../firestore";

export default function ConfirmScreen() {
  const { pickup, dropoff, latitude, longitude } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const pickupText = String(pickup || "Current location");
  const dropoffText = String(dropoff || "Destination");

  async function continueToRideOptions() {
    setLoading(true);

    try {
      const rideRef = await addDoc(collection(db, "rides"), {
        pickup: pickupText,
        dropoff: dropoffText,
        pickupLatitude: latitude ? Number(latitude) : null,
        pickupLongitude: longitude ? Number(longitude) : null,
        status: "choosing_ride",
        createdAt: serverTimestamp(),
      });

      router.push({
        pathname: "/rideoptions",
        params: {
          rideId: rideRef.id,
          pickup: pickupText,
          dropoff: dropoffText,
        },
      });
    } catch (err: any) {
      alert(err.message);
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ZUVO</Text>
      <Text style={styles.title}>Confirm Ride</Text>

      <View style={styles.card}>
        <Text style={styles.row}>📍 Pickup: {pickupText}</Text>
        <Text style={styles.row}>🏁 Drop-off: {dropoffText}</Text>
        <Text style={styles.row}>⏱️ Estimated Time: 24 min</Text>
        <Text style={styles.row}>📏 Estimated Distance: 11.2 mi</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={continueToRideOptions}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Saving Ride..." : "Choose Ride Type"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/rider")}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050505", padding: 24, justifyContent: "center" },
  logo: { color: "#A6FF00", fontSize: 28, fontWeight: "900", marginBottom: 20 },
  title: { color: "white", fontSize: 42, fontWeight: "900", marginBottom: 24 },
  card: { backgroundColor: "#101010", borderRadius: 24, padding: 20, marginBottom: 24 },
  row: { color: "white", fontSize: 18, marginBottom: 14 },
  button: { backgroundColor: "#A6FF00", padding: 18, borderRadius: 20, alignItems: "center" },
  buttonText: { color: "#050505", fontSize: 18, fontWeight: "900" },
  back: { color: "#A6FF00", textAlign: "center", marginTop: 20, fontSize: 16, fontWeight: "800" },
});