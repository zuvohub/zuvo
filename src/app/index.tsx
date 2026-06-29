import { router } from "expo-router";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import BottomNav from "../components/BottomNav";
import ZuvoButton from "../components/ZuvoButton";
import ZuvoCard from "../components/ZuvoCard";
import { auth } from "../firebase";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    Animated.timing(fade, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    return unsubscribe;
  }, []);

  async function logOut() {
    await signOut(auth);
    alert("Logged out!");
  }

  return (
    <View style={styles.page}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Animated.View style={{ opacity: fade }}>
          <View style={styles.topBar}>
            <View>
              <Text style={styles.logo}>ZUVO</Text>
              <Text style={styles.greeting}>
                {user ? "Good evening 👋" : "Welcome 👋"}
              </Text>
            </View>

            <View style={styles.statusPill}>
              <Text style={styles.statusText}>LA Beta</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Where are you going?</Text>
          <Text style={styles.heroSubtitle}>
            Fair rides for riders. Better pay for drivers.
          </Text>

          <ZuvoCard>
            <Text style={styles.cardTitle}>Start a ride</Text>
            <Text style={styles.cardSub}>Book a Zuvo ride in seconds.</Text>

            <ZuvoButton
              title="Ride With Zuvo"
              onPress={() => router.push("/rider")}
            />
          </ZuvoCard>

          <View style={styles.quickGrid}>
            <TouchableOpacity style={styles.quickCard} onPress={() => router.push("/history")}>
              <Text style={styles.quickIcon}>📜</Text>
              <Text style={styles.quickTitle}>History</Text>
              <Text style={styles.quickSub}>Your trips</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickCard} onPress={() => router.push("/driver")}>
              <Text style={styles.quickIcon}>🚗</Text>
              <Text style={styles.quickTitle}>Drive</Text>
              <Text style={styles.quickSub}>Earn more</Text>
            </TouchableOpacity>
          </View>

          <ZuvoCard>
            <Text style={styles.cardTitle}>Nearby activity</Text>
            <View style={styles.activityRow}>
              <Text style={styles.activityBig}>🚘 3</Text>
              <View>
                <Text style={styles.activityTitle}>Drivers online nearby</Text>
                <Text style={styles.activitySub}>Mock data for now • Live soon</Text>
              </View>
            </View>
          </ZuvoCard>

          <ZuvoCard>
            <Text style={styles.cardTitle}>Saved places</Text>
            <TouchableOpacity style={styles.placeRow}>
              <Text style={styles.placeIcon}>🏠</Text>
              <View>
                <Text style={styles.placeTitle}>Home</Text>
                <Text style={styles.placeSub}>Add your home address</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.placeRow}>
              <Text style={styles.placeIcon}>💼</Text>
              <View>
                <Text style={styles.placeTitle}>Work</Text>
                <Text style={styles.placeSub}>Add your work address</Text>
              </View>
            </TouchableOpacity>
          </ZuvoCard>

          {!user ? (
            <ZuvoButton
              title="Log In / Sign Up"
              onPress={() => router.push("/login")}
            />
          ) : (
            <ZuvoButton title="Log Out" onPress={logOut} />
          )}
        </Animated.View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: 120,
  },
  topBar: {
    marginTop: spacing.xl,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: colors.primary,
    fontSize: typography.heading,
    fontWeight: typography.bold,
  },
  greeting: {
    color: colors.mutedText,
    fontSize: typography.body,
    marginTop: spacing.xs,
  },
  statusPill: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.primary,
    borderWidth: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 999,
  },
  statusText: {
    color: colors.primary,
    fontWeight: typography.bold,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 46,
    fontWeight: typography.bold,
    marginTop: spacing.xl,
  },
  heroSubtitle: {
    color: colors.mutedText,
    fontSize: typography.body,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  cardTitle: {
    color: colors.text,
    fontSize: typography.subheading,
    fontWeight: typography.bold,
  },
  cardSub: {
    color: colors.mutedText,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  quickGrid: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  quickCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 24,
    padding: spacing.lg,
  },
  quickIcon: {
    fontSize: 30,
    marginBottom: spacing.md,
  },
  quickTitle: {
    color: colors.text,
    fontSize: typography.subheading,
    fontWeight: typography.bold,
  },
  quickSub: {
    color: colors.mutedText,
    marginTop: spacing.xs,
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.md,
  },
  activityBig: {
    fontSize: 38,
  },
  activityTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: typography.bold,
  },
  activitySub: {
    color: colors.mutedText,
    marginTop: spacing.xs,
  },
  placeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.md,
  },
  placeIcon: {
    fontSize: 26,
  },
  placeTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: typography.bold,
  },
  placeSub: {
    color: colors.mutedText,
    marginTop: spacing.xs,
  },
});