import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ExerciseScreen from "../src/components/Exercises";
import HomeScreen from "../src/components/Home";
import LoginScreen from "../src/components/LogIn";
import SignUpScreen from "../src/components/SignUp";
import { exercises } from "../src/constants/exercises";
import {
  getCompleted,
  getSession,
  logOut,
  saveCompleted,
} from "../src/constants/storage";
import { colors } from "../src/constants/themes";

type Screen = "loading" | "signup" | "login" | "home" | "exercise";

export default function App() {
  const [screen, setScreen] = useState<Screen>("loading");
  const [username, setUsername] = useState("");
  const [completed, setCompleted] = useState(0);
  const [activeLevel, setActiveLevel] = useState(0);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    (async () => {
      const saved = await getSession();
      if (saved) await enterHome(saved);
      else setScreen("signup");
    })();
  }, []);

  const enterHome = async (name: string) => {
    setUsername(name);
    setCompleted(await getCompleted(name));
    setScreen("home");
  };

  const handleLogOut = async () => {
    await logOut();
    setUsername("");
    setScreen("signup");
  };

  const handleComplete = async () => {
    if (activeLevel === completed) {
      const next = completed + 1;
      setCompleted(next);
      await saveCompleted(username, next);
    }
    setScreen("home");
  };

  let content: React.ReactNode;
  switch (screen) {
    case "loading":
      content = (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: colors.bg,
          }}
        >
          <ActivityIndicator color={colors.orange} />
        </View>
      );
      break;
    case "signup":
      content = (
        <SignUpScreen
          onSuccess={enterHome}
          onGoToLogin={() => setScreen("login")}
        />
      );
      break;
    case "login":
      content = (
        <LoginScreen
          onSuccess={enterHome}
          onGoToSignUp={() => setScreen("signup")}
        />
      );
      break;
    case "home":
      content = (
        <HomeScreen
          username={username}
          completed={completed}
          onStartLevel={(level) => {
            setActiveLevel(level);
            setAttempt((a) => a + 1);
            setScreen("exercise");
          }}
          onLogOut={handleLogOut}
        />
      );
      break;
    case "exercise":
      content = (
        <ExerciseScreen
          key={attempt}
          questions={exercises[activeLevel]}
          onComplete={handleComplete}
          onFail={() => setScreen("home")}
        />
      );
      break;
  }

  return <SafeAreaProvider>{content}</SafeAreaProvider>;
}
