import { router } from "expo-router";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import ZuvoButton from "../components/ZuvoButton";
import ZuvoCard from "../components/ZuvoCard";
import { auth } from "../firebase";
import db from "../firestore";

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const profileDoc = await getDoc(doc(db, "users", currentUser.uid));

        if (profileDoc.exists()) {
          setProfile(profileDoc.data());
        }
      }
    });

    return unsubscribe;
  }, []);

  async function logOut() {
    await signOut(auth);
    router.push("/");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ZUVO</Text>

      <Text style={styles.title}>Profile</Text>

      <ZuvoCard>
        <Text style={styles.row}>
          👤 Name: {profile?.name || "Loading..."}
        </Text>

        <Text style={styles.row}>
          📧 Email: {user?.email || "Not logged in"}
        </Text>

        <Text style={styles.row}>
          🚗 Account: {profile?.accountType || "N/A"}
        </Text>

        <Text style={styles.row}>
          ⭐ Rating: {profile?.rating || 5.0}
        </Text>

        <Text style={styles.row}>
          🚕 Rides Completed: {profile?.ridesCompleted || 0}
        </Text>
      </ZuvoCard>

      <ZuvoButton
        title="Back Home"
        onPress={() => router.push("/")}
      />

      <ZuvoButton
        title="Log Out"
        onPress={logOut}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
    justifyContent: "center",
    padding: 24,
  },

  logo: {
    color: "#A6FF00",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 20,
  },

  title: {
    color: "white",
    fontSize: 42,
    fontWeight: "900",
    marginBottom: 24,
  },

  row: {
    color: "white",
    fontSize: 18,
    marginBottom: 14,
  },
});