import { router } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ZUVO</Text>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Log in or create your account.</Text>

      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#777" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#777" secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.back}>← Back home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050505", padding: 24, justifyContent: "center" },
  logo: { color: "#A6FF00", fontSize: 30, fontWeight: "900", marginBottom: 20 },
  title: { color: "white", fontSize: 42, fontWeight: "900" },
  subtitle: { color: "white", fontSize: 16, marginTop: 8, marginBottom: 30 },
  input: { backgroundColor: "#151515", color: "white", padding: 18, borderRadius: 18, marginBottom: 14, fontSize: 16 },
  button: { backgroundColor: "#A6FF00", padding: 18, borderRadius: 20, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#050505", fontSize: 18, fontWeight: "900" },
  back: { color: "#A6FF00", textAlign: "center", marginTop: 20, fontWeight: "800" },
});