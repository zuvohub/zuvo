import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BottomNav() {
  return (
    <View style={styles.nav}>
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.item}>🏠 Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/rider")}>
        <Text style={styles.item}>🚗 Ride</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/history")}>
        <Text style={styles.item}>📜 History</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/profile")}>
        <Text style={styles.item}>👤 Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#111111",
    borderColor: "#A6FF00",
    borderWidth: 1,
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 999,
  },
  item: {
    color: "#A6FF00",
    fontWeight: "900",
    fontSize: 13,
  },
});