import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Question } from "../constants/exercises";
import { colors } from "../constants/themes";

type Props = {
  questions: Question[];
  onComplete: () => void;
  onFail: () => void;
};

const MAX_HEARTS = 3;

export default function ExerciseScreen({
  questions,
  onComplete,
  onFail,
}: Props) {
  const [index, setIndex] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [correct, setCorrect] = useState(0);

  const answer = (value: boolean) => {
    const isCorrect = questions[index].answer === value;
    const newHearts = isCorrect ? hearts : hearts - 1;
    const newCorrect = isCorrect ? correct + 1 : correct;

    setHearts(newHearts);
    setCorrect(newCorrect);

    if (newHearts <= 0) return onFail();
    if (index + 1 >= questions.length) return onComplete();
    setIndex(index + 1);
  };

  const progress = correct / questions.length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.counter}>
          {index + 1}/{questions.length}
        </Text>
        <View style={styles.bar}>
          <View style={[styles.barFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.hearts}>❤️ {hearts}</Text>
      </View>

      <View style={styles.middle}>
        <Text style={styles.question}>{questions[index].text}</Text>
      </View>

      <View style={styles.answers}>
        <Pressable
          style={[styles.answerBtn, styles.trueBtn]}
          onPress={() => answer(true)}
        >
          <Text style={styles.answerText}>Правда</Text>
        </Pressable>
        <Pressable
          style={[styles.answerBtn, styles.falseBtn]}
          onPress={() => answer(false)}
        >
          <Text style={styles.answerText}>Неправда</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 24 },
  top: { flexDirection: "row", alignItems: "center", gap: 12, paddingTop: 12 },
  counter: { fontSize: 16, fontWeight: "700", color: colors.text },
  bar: {
    flex: 1,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.gray,
    overflow: "hidden",
  },
  barFill: { height: "100%", backgroundColor: colors.success, borderRadius: 7 },
  hearts: { fontSize: 16, fontWeight: "700", color: colors.text },
  middle: { flex: 1, justifyContent: "center" },
  question: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    lineHeight: 30,
  },
  answers: { gap: 12, marginBottom: 24 },
  answerBtn: { borderRadius: 12, paddingVertical: 16, alignItems: "center" },
  trueBtn: { backgroundColor: colors.orange },
  falseBtn: { backgroundColor: colors.grayDark },
  answerText: { color: "#fff", fontSize: 18, fontWeight: "800" },
});
