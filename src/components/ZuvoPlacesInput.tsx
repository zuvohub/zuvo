import { useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { GOOGLE_MAPS_API_KEY } from "../config/google";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

type PlaceResult = {
  description: string;
  place_id: string;
};

type Props = {
  value: string;
  onSelect: (place: {
    description: string;
    latitude: number | null;
    longitude: number | null;
  }) => void;
};

export default function ZuvoPlacesInput({ value, onSelect }: Props) {
  const [text, setText] = useState(value);
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [debugMessage, setDebugMessage] = useState("");

  async function searchPlaces(input: string) {
    setText(input);
    setDebugMessage("");

    if (input.length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          input
        )}&key=${GOOGLE_MAPS_API_KEY}&components=country:us`
      );

      const data = await response.json();

      if (data.status !== "OK") {
        setDebugMessage(`Google status: ${data.status} ${data.error_message || ""}`);
        setResults([]);
      } else {
        setResults(data.predictions || []);
        setDebugMessage(`Found ${data.predictions?.length || 0} results`);
      }
    } catch (error: any) {
      setDebugMessage(error.message);
    }

    setLoading(false);
  }

  async function selectPlace(place: PlaceResult) {
    setText(place.description);
    setResults([]);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${GOOGLE_MAPS_API_KEY}`
      );

      const data = await response.json();

      if (data.status !== "OK") {
        setDebugMessage(`Details status: ${data.status} ${data.error_message || ""}`);
        return;
      }

      const location = data.result.geometry.location;

      onSelect({
        description: place.description,
        latitude: location.lat,
        longitude: location.lng,
      });
    } catch (error: any) {
      setDebugMessage(error.message);
    }
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="🏁 Search destination"
        placeholderTextColor={colors.mutedText}
        value={text}
        onChangeText={searchPlaces}
      />

      {loading && <ActivityIndicator color={colors.primary} style={{ marginBottom: 10 }} />}

      {!!debugMessage && <Text style={styles.debug}>{debugMessage}</Text>}

      {results.map((place) => (
        <TouchableOpacity
          key={place.place_id}
          style={styles.result}
          onPress={() => selectPlace(place)}
        >
          <Text style={styles.resultText}>{place.description}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surfaceLight,
    color: colors.text,
    padding: spacing.md,
    borderRadius: 18,
    marginBottom: spacing.md,
    fontSize: typography.body,
  },
  debug: {
    color: colors.primary,
    marginBottom: spacing.sm,
    fontSize: typography.caption,
  },
  result: {
    backgroundColor: colors.surfaceLight,
    padding: spacing.md,
    borderRadius: 14,
    marginBottom: spacing.sm,
  },
  resultText: {
    color: colors.primary,
    fontWeight: typography.semibold,
  },
});