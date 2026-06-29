import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CompleteScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ZUVO</Text>
      <Text style={styles.check}>✅</Text>
      <Text style={styles.title}>Trip Complete</Text>

      <View style={styles.card}>
        <Text style={styles.row}>Total Paid: $18.40</Text>
        <Text style={styles.row}>Driver Earned: $16.56</Text>
        <Text style={styles.row}>Zuvo Fee: $1.84</Text>
        <Text style={styles.stars}>⭐ ⭐ ⭐ ⭐ ⭐</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050505", padding: 24, justifyContent: "center" },
  logo: { color: "#A6FF00", fontSize: 28, fontWeight: "900", marginBottom: 20 },
  check: { fontSize: 70, textAlign: "center", marginBottom: 20 },
  title: { color: "white", fontSize: 42, fontWeight: "900", textAlign: "center", marginBottom: 24 },
  card: { backgroundColor: "#111111", padding: 24, borderRadius: 24, marginBottom: 24 },
  row: { color: "white", fontSize: 18, marginBottom: 12 },
  stars: { color: "#A6FF00", fontSize: 28, textAlign: "center", marginTop: 18 },
  button: { backgroundColor: "#A6FF00", padding: 18, borderRadius: 20, alignItems: "center" },
  buttonText: { color: "#050505", fontSize: 18, fontWeight: "900" },
});