import { StyleSheet, Text, TouchableOpacity } from "react-native";

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
    backgroundColor: "#A6FF00",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },

  text: {
    color: "#050505",
    fontSize: 18,
    fontWeight: "900",
  },
});