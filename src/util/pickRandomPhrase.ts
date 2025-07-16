const phrases: string[] = [
  "Keep going!",
  "You're doing great!",
  "Stay focused!",
  "Almost there!",
  "Keep pushing!",
  "Don't give up!",
  "Keep up the good work!",
  "Go for the Top!",
];

export const pickRandomPhrase = (): string => {
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
};
