import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
} from "react-native";
import { colors } from "../constants/themes";

export function Input(props: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor="#999"
      autoCapitalize="none"
      autoCorrect={false}
      style={styles.input}
      {...props}
    />
  );
}

export function PrimaryButton(props: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={props.onPress}
      disabled={props.disabled}
      style={[styles.button, props.disabled && { opacity: 0.6 }]}
    >
      <Text style={styles.buttonText}>{props.title}</Text>
    </Pressable>
  );
}

export function LinkButton(props: { title: string; onPress: () => void }) {
  return (
    <Pressable onPress={props.onPress} hitSlop={8}>
      <Text style={styles.link}>{props.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: colors.orange,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  link: { color: colors.orange, fontSize: 15, fontWeight: "700" },
});
