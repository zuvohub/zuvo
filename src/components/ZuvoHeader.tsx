import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

type Props = {
  title: string;
  subtitle?: string;
};

export default function ZuvoHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ZUVO</Text>

      <Text style={styles.title}>{title}</Text>

      {subtitle ? (
        <Text style={styles.subtitle}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },

  logo: {
    color: colors.primary,
    fontSize: typography.heading,
    fontWeight: typography.bold,
  },

  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: typography.bold,
    marginTop: spacing.sm,
  },

  subtitle: {
    color: colors.mutedText,
    fontSize: typography.body,
    marginTop: spacing.sm,
  },
});