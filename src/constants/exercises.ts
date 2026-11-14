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

export const exercises: Record<number, Question[]> = {
  0: exercise1,
};
