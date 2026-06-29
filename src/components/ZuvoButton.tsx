import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

type Props = {
  title: string;
  onPress: () => void;
};

export default function ZuvoButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md + 2,
    borderRadius: 20,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  text: {
    color: colors.darkText,
    fontSize: typography.body,
    fontWeight: typography.bold,
  },
});