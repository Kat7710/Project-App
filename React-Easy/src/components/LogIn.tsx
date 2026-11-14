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
import { logIn } from "../constants/storage";
import { colors } from "../constants/themes";

type Props = {
  onSuccess: (username: string) => void;
  onGoToSignUp: () => void;
};

export default function LoginScreen({ onSuccess, onGoToSignUp }: Props) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const result = await logIn(identifier, password);
    if (result.ok) onSuccess(result.username);
    else setError(result.error);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.form}
      >
        <Text style={styles.title}>Welcome back</Text>
        <Input
          placeholder="User name or email"
          value={identifier}
          onChangeText={setIdentifier}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <PrimaryButton title="Log In" onPress={handleLogin} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have a profile yet?</Text>
          <LinkButton title="Sign up" onPress={onGoToSignUp} />
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
