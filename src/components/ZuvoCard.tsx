import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type Props = {
  children: ReactNode;
};

export default function ZuvoCard({ children }: Props) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 24,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
});