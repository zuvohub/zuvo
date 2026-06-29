import { router } from "expo-router";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import ZuvoButton from "../components/ZuvoButton";
import { auth } from "../firebase";

export default function HomeScreen() {
  const [showHome, setShowHome] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    Animated.timing(fade, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    setTimeout(() => setShowHome(true), 1800);

    return unsubscribe;
  }, []);

  async function logOut() {
    await signOut(auth);
    alert("Logged out!");
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fade,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text style={styles.zLogo}>Z</Text>

        <Text style={styles.logo}>ZUVO</Text>

        <Text style={styles.tagline}>Fair rides. Fair pay.</Text>

        {user ? (
          <Text style={styles.userText}>Logged in as {user.email}</Text>
        ) : (
          <Text style={styles.userText}>Not logged in</Text>
        )}

        {showHome && (
          <View style={styles.buttonBox}>
            {!user && (
              <ZuvoButton
                title="Log In / Sign Up"
                onPress={() => router.push("/login")}
              />
            )}

            <ZuvoButton
              title="Ride with Zuvo"
              onPress={() => router.push("/rider")}
            />

            <ZuvoButton
              title="Drive with Zuvo"
              onPress={() => router.push("/driver")}
            />

            <ZuvoButton
              title="Profile"
              onPress={() => router.push("/profile")}
            />

            {user && (
              <ZuvoButton
                title="Log Out"
                onPress={logOut}
              />
            )}
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  zLogo: {
    fontSize: 96,
    fontWeight: "900",
    color: "#A6FF00",
    marginBottom: -20,
  },

  logo: {
    fontSize: 56,
    fontWeight: "900",
    color: "white",
    letterSpacing: 4,
  },

  tagline: {
    color: "#A6FF00",
    fontSize: 18,
    marginTop: 8,
  },

  userText: {
    color: "white",
    marginTop: 18,
    fontSize: 14,
  },

  buttonBox: {
    width: "100%",
    marginTop: 50,
  },
});