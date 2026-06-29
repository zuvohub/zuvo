import { router, useLocalSearchParams } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import db from "../firestore";

function getBaseFare(destination: string) {
  const place = destination.toLowerCase();

  if (place.includes("lax")) return 34.5;
  if (place.includes("santa monica")) return 22.75;
  if (place.includes("dodger")) return 19.25;
  if (place.includes("crypto")) return 16.8;
  if (place.includes("hollywood")) return 21.4;
  if (place.includes("downtown")) return 14.9;

  return 18.4;
}

export default function RideOptionsScreen() {
  const { rideId, pickup, dropoff } = useLocalSearchParams();

  const pickupText = String(pickup || "Current location");
  const dropoffText = String(dropoff || "Destination");
  const rideIdText = String(rideId || "");

  const standard = getBaseFare(dropoffText);
  const xl = standard * 1.35;
  const premium = standard * 1.75;

  async function chooseRide(type: string, total: number) {
    if (!rideIdText) {
      alert("Missing ride ID. Go back and start from Rider screen again.");
      return;
    }

    try {
      await updateDoc(doc(db, "rides", rideIdText), {
        rideType: type,
        total: Number(total.toFixed(2)),
        driverEarns: Number((total * 0.9).toFixed(2)),
        zuvoFee: Number((total * 0.1).toFixed(2)),
        status: "choosing_ride",
      });

      alert("Ride saved to Firebase!");
      router.push("/finding");
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ZUVO</Text>
      <Text style={styles.title}>Choose your ride</Text>

      <Text style={styles.debug}>Ride ID: {rideIdText || "MISSING"}</Text>

      <Text style={styles.tripText}>📍 {pickupText}</Text>
      <Text style={styles.tripText}>🏁 {dropoffText}</Text>

      <TouchableOpacity style={styles.option} onPress={() => chooseRide("Zuvo Standard", standard)}>
        <Text style={styles.name}>Zuvo Standard</Text>
        <Text style={styles.detail}>2 min away • Driver earns 90%</Text>
        <Text style={styles.price}>${standard.toFixed(2)}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => chooseRide("Zuvo XL", xl)}>
        <Text style={styles.name}>Zuvo XL</Text>
        <Text style={styles.detail}>4 min away • Bigger vehicle</Text>
        <Text style={styles.price}>${xl.toFixed(2)}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => chooseRide("Zuvo Premium", premium)}>
        <Text style={styles.name}>Zuvo Premium</Text>
        <Text style={styles.detail}>Luxury ride • Top drivers</Text>
        <Text style={styles.price}>${premium.toFixed(2)}</Text>
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
  title: { color: "white", fontSize: 42, fontWeight: "900", marginBottom: 18 },
  debug: { color: "#A6FF00", fontSize: 14, marginBottom: 12 },
  tripText: { color: "white", fontSize: 15, marginBottom: 8 },
  option: { backgroundColor: "#111111", padding: 22, borderRadius: 24, marginBottom: 16 },
  name: { color: "white", fontSize: 22, fontWeight: "900" },
  detail: { color: "white", fontSize: 14, marginTop: 8 },
  price: { color: "#A6FF00", fontSize: 26, fontWeight: "900", marginTop: 12 },
  back: { color: "#A6FF00", textAlign: "center", marginTop: 20, fontWeight: "800" },
});