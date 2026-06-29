import { router } from "expo-router";
import { collection, onSnapshot, query, where } from "firebase/firestore";
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
        const doc = snapshot.docs[0];

        setRide({
          id: doc.id,
          ...doc.data(),
        });
      } else {
        setRide(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ZUVO</Text>

      <Text style={styles.title}>Driver Mode</Text>

      {ride ? (
        <View style={styles.card}>
          <Text style={styles.row}>📍 {ride.pickup}</Text>
          <Text style={styles.row}>🏁 {ride.dropoff}</Text>

          <Text style={styles.money}>
            Driver earns ${ride.driverEarns}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/driverfound")}
          >
            <Text style={styles.buttonText}>
              Accept Ride
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.waiting}>
            Waiting for ride requests...
          </Text>
        </View>
      )}

      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.back}>← Back Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
    justifyContent: "center",
    padding: 25,
  },

  logo: {
    color: "#A6FF00",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 20,
  },

  title: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#151515",
    padding: 20,
    borderRadius: 20,
  },

  row: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },

  money: {
    color: "#A6FF00",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },

  waiting: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#A6FF00",
    padding: 18,
    borderRadius: 15,
  },

  buttonText: {
    color: "#050505",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },

  back: {
    color: "#A6FF00",
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
});