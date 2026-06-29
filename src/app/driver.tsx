import { router } from "expo-router";
import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import db from "../firestore";

export default function DriverScreen() {
  const [ride, setRide] = useState<any>(null);

  useEffect(() => {
    const q = query(
      collection(db, "rides"),
      where("status", "==", "choosing_ride")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const rideDoc = snapshot.docs[0];

        setRide({
          id: rideDoc.id,
          ...rideDoc.data(),
        });
      } else {
        setRide(null);
      }
    });

    return unsubscribe;
  }, []);

  async function acceptRide() {
    if (!ride) return;

    await updateDoc(doc(db, "rides", ride.id), {
      status: "accepted",
      driverName: "Marcus",
      car: "Toyota Camry",
      plate: "7ABC123",
    });

    router.push("/driverfound");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ZUVO</Text>
      <Text style={styles.title}>Driver Mode</Text>

      {ride ? (
        <View style={styles.card}>
          <Text style={styles.badge}>🚖 New Ride Request</Text>

          <Text style={styles.row}>Type: {ride.rideType || "Not selected"}</Text>
          <Text style={styles.row}>📍 Pickup: {ride.pickup}</Text>
          <Text style={styles.row}>🏁 Drop-off: {ride.dropoff}</Text>

          <Text style={styles.total}>Rider pays: ${ride.total || "0.00"}</Text>
          <Text style={styles.money}>You earn: ${ride.driverEarns || "0.00"}</Text>
          <Text style={styles.fee}>Zuvo fee: ${ride.zuvoFee || "0.00"}</Text>

          <TouchableOpacity style={styles.button} onPress={acceptRide}>
            <Text style={styles.buttonText}>Accept Ride</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.waiting}>Waiting for ride requests...</Text>
        </View>
      )}

      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.back}>← Back Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050505", justifyContent: "center", padding: 25 },
  logo: { color: "#A6FF00", fontSize: 30, fontWeight: "900", marginBottom: 20 },
  title: { color: "white", fontSize: 40, fontWeight: "bold", marginBottom: 20 },
  card: { backgroundColor: "#151515", padding: 20, borderRadius: 20 },
  badge: { color: "#A6FF00", fontSize: 20, fontWeight: "900", marginBottom: 16 },
  row: { color: "white", fontSize: 17, marginBottom: 10 },
  total: { color: "white", fontSize: 18, marginTop: 16 },
  money: { color: "#A6FF00", fontSize: 28, fontWeight: "bold", marginTop: 8 },
  fee: { color: "white", fontSize: 16, marginTop: 8, marginBottom: 20 },
  waiting: { color: "white", fontSize: 20, textAlign: "center" },
  button: { backgroundColor: "#A6FF00", padding: 18, borderRadius: 15 },
  buttonText: { color: "#050505", textAlign: "center", fontWeight: "bold", fontSize: 18 },
  back: { color: "#A6FF00", textAlign: "center", marginTop: 20, fontWeight: "bold" },
});