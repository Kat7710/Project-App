import React, { useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { exercises } from "../constants/exercises";
import { colors } from "../constants/themes";

type Props = {
  username: string;
  completed: number;
  onStartLevel: (levelIndex: number) => void;
  onLogOut: () => void;
};

const LEVELS = [0, 1, 2];
const DOCS_URL = "https://react.dev/learn";

export default function HomeScreen({
  username,
  completed,
  onStartLevel,
  onLogOut,
}: Props) {
  const [message, setMessage] = useState("");

  const handleLevelPress = (level: number) => {
    if (level > completed) return;
    if (!exercises[level]) {
      setMessage("Ця вправа з’явиться незабаром!");
      return;
    }
    setMessage("");
    onStartLevel(level);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hello}>Привіт, {username}</Text>
        <Pressable onPress={onLogOut} hitSlop={8}>
          <Text style={styles.logout}>Вийти</Text>
        </Pressable>
      </View>

      <View style={styles.levels}>
        {LEVELS.map((level) => {
          const unlocked = level <= completed;
          return (
            <Pressable
              key={level}
              onPress={() => handleLevelPress(level)}
              style={[
                styles.level,
                unlocked ? styles.levelOn : styles.levelOff,
              ]}
            >
              <Text style={styles.levelText}>{level + 1}</Text>
            </Pressable>
          );
        })}
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>

      <Pressable style={styles.docs} onPress={() => Linking.openURL(DOCS_URL)}>
        <Text style={styles.docsText}>React документація</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 24 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
  },
  hello: { fontSize: 16, color: colors.muted },
  logout: { fontSize: 16, fontWeight: "700", color: colors.orange },
  levels: { flex: 1, justifyContent: "center", alignItems: "center", gap: 28 },
  level: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 6,
  },
  levelOn: {
    backgroundColor: colors.orange,
    borderBottomColor: colors.orangeDark,
  },
  levelOff: {
    backgroundColor: colors.gray,
    borderBottomColor: colors.grayDark,
  },
  levelText: { fontSize: 28, fontWeight: "800", color: "#fff" },
  message: { color: colors.muted, marginTop: 4 },
  docs: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  docsText: { fontSize: 16, fontWeight: "700", color: colors.text },
});
