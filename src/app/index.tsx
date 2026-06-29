import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const [showHome, setShowHome] = useState(false);
  const fade = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    setTimeout(() => setShowHome(true), 1800);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fade, width: "100%", alignItems: "center" }}>
        <Text style={styles.zLogo}>Z</Text>
        <Text style={styles.logo}>ZUVO</Text>
        <Text style={styles.tagline}>Fair rides. Fair pay.</Text>

        {showHome && (
          <View style={styles.buttonBox}>
            <TouchableOpacity style={styles.button} onPress={() => router.push("/rider")}>
              <Text style={styles.buttonText}>Ride with Zuvo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.outlineButton} onPress={() => router.push("/driver")}>
              <Text style={styles.outlineText}>Drive with Zuvo</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050505", alignItems: "center", justifyContent: "center", padding: 24 },
  zLogo: { fontSize: 96, fontWeight: "900", color: "#A6FF00", marginBottom: -20 },
  logo: { fontSize: 56, fontWeight: "900", color: "#FFFFFF", letterSpacing: 4 },
  tagline: { color: "#A6FF00", fontSize: 18, marginTop: 8 },
  buttonBox: { width: "100%", marginTop: 70 },
  button: { backgroundColor: "#A6FF00", width: "100%", paddingVertical: 18, borderRadius: 20, alignItems: "center", marginBottom: 14 },
  buttonText: { color: "#050505", fontSize: 16, fontWeight: "900" },
  outlineButton: { borderColor: "#A6FF00", borderWidth: 1, width: "100%", paddingVertical: 18, borderRadius: 20, alignItems: "center" },
  outlineText: { color: "#A6FF00", fontSize: 16, fontWeight: "900" },
});