import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, LinkButton, PrimaryButton } from "./components";
import { signUp } from "../constants/storage";
import { colors } from "../constants/themes";

type Props = { onSuccess: (username: string) => void; onGoToLogin: () => void };

export default function SignUpScreen({ onSuccess, onGoToLogin }: Props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    const result = await signUp(username, email, password);
    if (result.ok) onSuccess(result.username);
    else setError(result.error);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.form}
      >
        <Text style={styles.title}>Створіть свій профіль</Text>
        <Input
          placeholder="Ім’я користувача"
          value={username}
          onChangeText={setUsername}
        />
        <Input
          placeholder="Адреса електронної пошти"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Input
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <PrimaryButton title="Зареєструватися" onPress={handleSignUp} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Вже маєте профіль?</Text>
          <LinkButton title="Увійти" onPress={onGoToLogin} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  form: { flex: 1, justifyContent: "center", paddingHorizontal: 24, gap: 14 },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
    marginBottom: 8,
  },
  error: { color: colors.error, textAlign: "center" },
  footer: { alignItems: "center", gap: 4, marginTop: 12 },
  footerText: { color: colors.muted },
});
