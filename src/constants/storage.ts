import AsyncStorage from "@react-native-async-storage/async-storage";

export type User = { username: string; email: string; password: string };
export type Result =
  | { ok: true; username: string }
  | { ok: false; error: string };

const USERS_KEY = "users";
const SESSION_KEY = "session";
const progressKey = (username: string) => `progress:${username.toLowerCase()}`;

async function getUsers(): Promise<User[]> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  return raw ? (JSON.parse(raw) as User[]) : [];
}

export async function signUp(
  username: string,
  email: string,
  password: string,
): Promise<Result> {
  username = username.trim();
  email = email.trim();

  if (username.length < 3)
    return {
      ok: false,
      error: "Ім'я користувача має містити щонайменше 3 символи.",
    };
  if (!/^\S+@\S+\.\S+$/.test(email))
    return {
      ok: false,
      error: "Будь ласка, введіть дійсну електронну адресу.",
    };
  if (password.length < 6)
    return { ok: false, error: "Пароль має містити щонайменше 6 символів." };

  const users = await getUsers();
  if (users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
    return { ok: false, error: "Це ім'я користувача вже зайняте." };
  }
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, error: "Ця електронна адреса вже зареєстрована." };
  }

  users.push({ username, email, password });
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  await AsyncStorage.setItem(SESSION_KEY, username);
  return { ok: true, username };
}

export async function logIn(
  identifier: string,
  password: string,
): Promise<Result> {
  const id = identifier.trim().toLowerCase();
  const users = await getUsers();
  const user = users.find(
    (u) => u.username.toLowerCase() === id || u.email.toLowerCase() === id,
  );
  if (!user || user.password !== password) {
    return {
      ok: false,
      error: "Неправильне ім'я користувача/електронна адреса або пароль.",
    };
  }
  await AsyncStorage.setItem(SESSION_KEY, user.username);
  return { ok: true, username: user.username };
}

export async function logOut(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export async function getSession(): Promise<string | null> {
  return AsyncStorage.getItem(SESSION_KEY);
}

export async function getCompleted(username: string): Promise<number> {
  const raw = await AsyncStorage.getItem(progressKey(username));
  return raw ? Number(raw) : 0;
}

export async function saveCompleted(
  username: string,
  count: number,
): Promise<void> {
  await AsyncStorage.setItem(progressKey(username), String(count));
}
