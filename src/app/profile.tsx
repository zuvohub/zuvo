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

  return (
    <View style={styles.page}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <ZuvoHeader
          title="Profile"
          subtitle="Manage your ZUVO account"
        />

        <ZuvoCard>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>
            {profile?.name || "Loading..."}
          </Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>
            {user?.email || "Not logged in"}
          </Text>

          <Text style={styles.label}>Account Type</Text>
          <Text style={styles.value}>
            {profile?.accountType || "Rider"}
          </Text>

          <Text style={styles.label}>Rating</Text>
          <Text style={styles.value}>
            ⭐ {profile?.rating || "5.0"}
          </Text>

          <Text style={styles.label}>Completed Rides</Text>
          <Text style={styles.value}>
            {profile?.ridesCompleted || 0}
          </Text>
        </ZuvoCard>

        <ZuvoButton
          title="Log Out"
          onPress={logOut}
        />
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

  label: {
    color: colors.mutedText,
    fontSize: typography.caption,
    marginTop: spacing.md,
  },

  value: {
    color: colors.text,
    fontSize: typography.subheading,
    fontWeight: typography.bold,
    marginTop: spacing.xs,
  },
});