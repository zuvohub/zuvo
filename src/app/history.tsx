import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import BottomNav from "../components/BottomNav";
import db from "../firestore";

export default function HistoryScreen() {
  const [rides, setRides] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "rides"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rideList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRides(rideList);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.page}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.logo}>ZUVO</Text>

        <Text style={styles.title}>Ride History</Text>

        {rides.length === 0 ? (
          <Text style={styles.empty}>No rides yet.</Text>
        ) : (
          rides.map((ride) => (
            <View key={ride.id} style={styles.card}>
              <Text style={styles.type}>
                {ride.rideType || "Zuvo Ride"}
              </Text>

              <Text style={styles.route}>
                📍 {ride.pickup}
              </Text>

              <Text style={styles.route}>
                🏁 {ride.dropoff}
              </Text>

              <Text style={styles.price}>
                ${ride.total || "0.00"}
              </Text>

              <Text style={styles.status}>
                Status: {ride.status}
              </Text>

              <Text style={styles.driver}>
                Driver Earned: ${ride.driverEarns || "0.00"}
              </Text>
            </View>
          ))
        )}
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
    fontSize: 30,
    fontWeight: "900",
    marginTop: 20,
  },

  title: {
    color: "white",
    fontSize: 42,
    fontWeight: "900",
    marginTop: 20,
    marginBottom: 24,
  },

  empty: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 60,
  },

  card: {
    backgroundColor: "#111111",
    padding: 22,
    borderRadius: 22,
    marginBottom: 18,
  },

  type: {
    color: "#A6FF00",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 12,
  },

  route: {
    color: "white",
    fontSize: 16,
    marginBottom: 8,
  },

  price: {
    color: "#A6FF00",
    fontSize: 28,
    fontWeight: "900",
    marginTop: 14,
  },

  status: {
    color: "white",
    marginTop: 10,
    fontSize: 15,
  },

  driver: {
    color: "#CCCCCC",
    marginTop: 8,
    fontSize: 14,
  },
});