import { router } from "expo-router";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import BottomNav from "../components/BottomNav";
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

    setTimeout(() => setShowHome(true), 800);

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

        <Text style={styles.tagline}>
          Fair rides. Fair pay.
        </Text>

        {user && (
          <Text style={styles.user}>
            Welcome back 👋{"\n"}
            {user.email}
          </Text>
        )}

        {showHome && (
          <View style={styles.buttons}>
            {!user && (
              <ZuvoButton
                title="Log In / Sign Up"
                onPress={() => router.push("/login")}
              />
            )}

            <ZuvoButton
              title="Ride With Zuvo"
              onPress={() => router.push("/rider")}
            />

            <ZuvoButton
              title="Drive With Zuvo"
              onPress={() => router.push("/driver")}
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

      <BottomNav />
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
    fontSize: 100,
    color: "#A6FF00",
    fontWeight: "900",
    marginBottom: -20,
  },

  logo: {
    fontSize: 56,
    color: "white",
    fontWeight: "900",
    letterSpacing: 4,
  },

  tagline: {
    color: "#A6FF00",
    marginTop: 10,
    fontSize: 18,
  },

  user: {
    color: "white",
    marginTop: 25,
    textAlign: "center",
    fontSize: 15,
  },

  buttons: {
    width: "100%",
    marginTop: 40,
  },
});