import { router } from "expo-router";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
        setProfile(profileDoc.data());
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

      <View style={styles.card}>
        <Text style={styles.row}>Name: {profile?.name || "Loading..."}</Text>
        <Text style={styles.row}>Email: {user?.email || "Not logged in"}</Text>
        <Text style={styles.row}>Account: {profile?.accountType || "N/A"}</Text>
        <Text style={styles.row}>Rating: ⭐ {profile?.rating || "5.0"}</Text>
        <Text style={styles.row}>Rides: {profile?.ridesCompleted || 0}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
        <Text style={styles.buttonText}>Back Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout} onPress={logOut}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050505", padding: 24, justifyContent: "center" },
  logo: { color: "#A6FF00", fontSize: 30, fontWeight: "900", marginBottom: 20 },
  title: { color: "white", fontSize: 42, fontWeight: "900", marginBottom: 24 },
  card: { backgroundColor: "#111111", padding: 24, borderRadius: 24, marginBottom: 24 },
  row: { color: "white", fontSize: 18, marginBottom: 14 },
  button: { backgroundColor: "#A6FF00", padding: 18, borderRadius: 20, alignItems: "center" },
  buttonText: { color: "#050505", fontSize: 18, fontWeight: "900" },
  logout: { marginTop: 18 },
  logoutText: { color: "white", textAlign: "center", fontSize: 16, fontWeight: "800" },
});