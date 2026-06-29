import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RideOptionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ZUVO</Text>
      <Text style={styles.title}>Choose your ride</Text>

      <TouchableOpacity style={styles.option} onPress={() => router.push("/finding")}>
        <Text style={styles.name}>Zuvo Standard</Text>
        <Text style={styles.detail}>2 min away • Driver earns 90%</Text>
        <Text style={styles.price}>$18.40</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => router.push("/finding")}>
        <Text style={styles.name}>Zuvo XL</Text>
        <Text style={styles.detail}>4 min away • Bigger vehicle</Text>
        <Text style={styles.price}>$24.75</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => router.push("/finding")}>
        <Text style={styles.name}>Zuvo Premium</Text>
        <Text style={styles.detail}>Luxury ride • Top drivers</Text>
        <Text style={styles.price}>$32.10</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/confirm")}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050505", padding: 24, justifyContent: "center" },
  logo: { color: "#A6FF00", fontSize: 28, fontWeight: "900", marginBottom: 20 },
  title: { color: "white", fontSize: 42, fontWeight: "900", marginBottom: 24 },
  option: { backgroundColor: "#111111", padding: 22, borderRadius: 24, marginBottom: 16 },
  name: { color: "white", fontSize: 22, fontWeight: "900" },
  detail: { color: "white", fontSize: 14, marginTop: 8 },
  price: { color: "#A6FF00", fontSize: 26, fontWeight: "900", marginTop: 12 },
  back: { color: "#A6FF00", textAlign: "center", marginTop: 20, fontWeight: "800" },
});