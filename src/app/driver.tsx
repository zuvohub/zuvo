import { router } from "expo-router";
import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import db from "../firestore";

type Ride = {
  id: string;
  pickup: string;
  dropoff: string;
  total: number;
  driverEarns: number;
  status: string;
};

export default function DriverScreen() {
  const [ride, setRide] = useState<Ride | null>(null);

  useEffect(() => {
    const ridesQuery = query(
      collection(db, "rides"),
      where("status", "==", "choosing_ride")
    );

    const unsubscribe = onSnapshot(ridesQuery, (snapshot) => {
      if (!snapshot.empty) {
        const rideDoc = snapshot.docs[0];
        setRide({ id: rideDoc.id, ...rideDoc.data() } as Ride);
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
          <Text style={styles.online}>🚖 New Ride Request</Text>
          <Text style={styles.info}>Pickup: {ride.pickup}</Text>
          <Text style={styles.info}>Drop-off: {ride.dropoff}</Text>
          <Text style={styles.money}>You earn: ${ride.driverEarns}</Text>

          <TouchableOpacity style={styles.button} onPress={acceptRide}>
            <Text style={styles.buttonText}>Accept Ride</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.online}>🟢 You're Online</Text>
          <Text style={styles.info}>Waiting for ride requests...</Text>
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
  title: { color: "white", fontSize: 42, fontWeight: "bold", marginBottom: 20 },
  card: { backgroundColor: "#151515", padding: 20, borderRadius: 20, marginBottom: 30 },
  online: { color: "#6CFF6C", fontSize: 20, fontWeight: "900", marginBottom: 15 },
  money: { color: "#A6FF00", fontSize: 28, fontWeight: "bold", marginVertical: 18 },
  info: { color: "white", fontSize: 17, marginBottom: 10 },
  button: { backgroundColor: "#A6FF00", padding: 18, borderRadius: 15, marginTop: 10 },
  buttonText: { textAlign: "center", color: "#050505", fontWeight: "bold", fontSize: 18 },
  back: { textAlign: "center", color: "#A6FF00", marginTop: 20, fontSize: 16, fontWeight: "bold" },
});