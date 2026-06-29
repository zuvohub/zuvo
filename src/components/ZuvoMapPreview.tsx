import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

type Props = {
  locationText: string;
};

export default function ZuvoMapPreview({ locationText }: Props) {
  return (
    <View style={styles.mapBox}>
      <Text style={styles.mapTitle}>🗺️ Map Preview</Text>
      <Text style={styles.mapText}>📍 {locationText}</Text>
      <Text style={styles.car}>🚗</Text>
      <Text style={styles.note}>Real map coming next</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mapBox: {
    height: 260,
    borderRadius: 28,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  mapTitle: {
    color: colors.text,
    fontSize: typography.subheading,
    fontWeight: typography.bold,
    marginBottom: spacing.sm,
  },
  mapText: {
    color: colors.primary,
    fontSize: typography.body,
    fontWeight: typography.bold,
    textAlign: "center",
  },
  car: {
    fontSize: 50,
    marginTop: spacing.md,
  },
  note: {
    color: colors.mutedText,
    marginTop: spacing.sm,
  },
});