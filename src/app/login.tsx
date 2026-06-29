import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";
import db from "../firestore";

export default function LoginScreen() {
  const [name, setName] = useState("");
  const [accountType, setAccountType] = useState<"rider" | "driver">("rider");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUp() {
    try {
      if (!name || !email || !password) {
        alert("Please enter name, email, and password.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        accountType,
        rating: 5.0,
        ridesCompleted: 0,
        createdAt: serverTimestamp(),
      });

      alert("Account created!");
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function logIn() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in!");
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ZUVO</Text>
      <Text style={styles.title}>Login / Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Full name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      <View style={styles.typeRow}>
        <TouchableOpacity
          style={accountType === "rider" ? styles.activeType : styles.typeButton}
          onPress={() => setAccountType("rider")}
        >
          <Text style={accountType === "rider" ? styles.activeTypeText : styles.typeText}>
            Rider
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={accountType === "driver" ? styles.activeType : styles.typeButton}
          onPress={() => setAccountType("driver")}
        >
          <Text style={accountType === "driver" ? styles.activeTypeText : styles.typeText}>
            Driver
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={logIn}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.outlineButton} onPress={signUp}>
        <Text style={styles.outlineText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.back}>← Back Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050505", padding: 24, justifyContent: "center" },
  logo: { color: "#A6FF00", fontSize: 30, fontWeight: "900", marginBottom: 20 },
  title: { color: "white", fontSize: 38, fontWeight: "900", marginBottom: 25 },
  input: { backgroundColor: "#151515", color: "white", padding: 18, borderRadius: 18, marginBottom: 14, fontSize: 16 },
  typeRow: { flexDirection: "row", gap: 12, marginBottom: 14 },
  typeButton: { flex: 1, borderColor: "#A6FF00", borderWidth: 1, padding: 15, borderRadius: 16, alignItems: "center" },
  activeType: { flex: 1, backgroundColor: "#A6FF00", padding: 15, borderRadius: 16, alignItems: "center" },
  typeText: { color: "#A6FF00", fontWeight: "900" },
  activeTypeText: { color: "#050505", fontWeight: "900" },
  button: { backgroundColor: "#A6FF00", padding: 18, borderRadius: 20, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#050505", fontSize: 18, fontWeight: "900" },
  outlineButton: { borderColor: "#A6FF00", borderWidth: 1, padding: 18, borderRadius: 20, alignItems: "center", marginTop: 14 },
  outlineText: { color: "#A6FF00", fontSize: 18, fontWeight: "900" },
  back: { color: "#A6FF00", textAlign: "center", marginTop: 20, fontWeight: "800" },
});