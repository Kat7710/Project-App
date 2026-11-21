export type Question = { text: string; answer: boolean };

export const exercise1: Question[] = [
  {
    text: "React це бібліотека JavaScript для створення інтерфейсів користувача.",
    answer: true,
  },
  { text: "Компоненти завжди повинні бути написані як класи.", answer: false },
  {
    text: "JSX дозволяє писати розмітку, схожу на HTML, усередині JavaScript.",
    answer: true,
  },
  {
    text: "Пропси використовуються для передачі даних від батьківського компонента до дочірнього.",
    answer: true,
  },
  {
    text: "Вам слід оновити стан, присвоївши значення безпосередньо: count = count + 1.",
    answer: false,
  },
];

export const exercise2: Question[] = [
  {
    text: "useState повертає поточне значення та функцію для його оновлення.",
    answer: true,
  },
  {
    text: "useEffect виконується лише один раз, незалежно від того, що ви йому передаєте.",
    answer: false,
  },
  {
    text: "Кожен елемент у відрендереному списку повинен мати унікальну властивість key.",
    answer: true,
  },
  {
    text: "Ви можете викликати хуки всередині операторів if.",
    answer: false,
  },
  {
    text: "Назва компонента має починатися з великої літери.",
    answer: true,
  },
];

export const exercises: Record<number, Question[]> = {
  0: exercise1,
  1: exercise2,
};
