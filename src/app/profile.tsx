import { router } from "expo-router";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import BottomNav from "../components/BottomNav";
import ZuvoButton from "../components/ZuvoButton";
import ZuvoCard from "../components/ZuvoCard";
import ZuvoHeader from "../components/ZuvoHeader";

import { auth } from "../firebase";
import db from "../firestore";

import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const profileDoc = await getDoc(doc(db, "users", currentUser.uid));

        if (profileDoc.exists()) {
          setProfile(profileDoc.data());
        }
      }
    });

    return unsubscribe;
  }, []);

  async function logOut() {
    await signOut(auth);
    router.replace("/");
  }

  const name = profile?.name || "ZUVO Rider";
  const initials = name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={styles.page}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <ZuvoHeader title="Profile" subtitle="Your ZUVO account" />

        <View style={styles.hero}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>

          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{user?.email || "Not logged in"}</Text>

          <View style={styles.accountBadge}>
            <Text style={styles.accountBadgeText}>
              {profile?.accountType || "Rider"} Account
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <ZuvoCard>
            <Text style={styles.statNumber}>⭐ {profile?.rating || "5.0"}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </ZuvoCard>

          <ZuvoCard>
            <Text style={styles.statNumber}>{profile?.ridesCompleted || 0}</Text>
            <Text style={styles.statLabel}>Rides</Text>
          </ZuvoCard>
        </View>

        <ZuvoCard>
          <Text style={styles.sectionTitle}>Account Details</Text>

          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{name}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email || "Not logged in"}</Text>

          <Text style={styles.label}>Account Type</Text>
          <Text style={styles.value}>{profile?.accountType || "Rider"}</Text>
        </ZuvoCard>

        <ZuvoButton title="Log Out" onPress={logOut} />
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
  hero: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  avatarText: {
    color: colors.darkText,
    fontSize: 34,
    fontWeight: typography.bold,
  },
  name: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: typography.bold,
  },
  email: {
    color: colors.mutedText,
    fontSize: typography.body,
    marginTop: spacing.xs,
  },
  accountBadge: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  accountBadgeText: {
    color: colors.primary,
    fontWeight: typography.bold,
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  statNumber: {
    color: colors.primary,
    fontSize: typography.subheading,
    fontWeight: typography.bold,
  },
  statLabel: {
    color: colors.mutedText,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.subheading,
    fontWeight: typography.bold,
    marginBottom: spacing.md,
  },
  label: {
    color: colors.mutedText,
    fontSize: typography.caption,
    marginTop: spacing.md,
  },
  value: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: typography.bold,
    marginTop: spacing.xs,
  },
});