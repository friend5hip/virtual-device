interface PlaySoundParams {
  sound: string;
  volume?: number;
}

export const playSound = ({ sound, volume = 1 }: PlaySoundParams) => {
  const audio = new Audio(sound);
  audio.volume = volume;
  audio.play().catch(console.error);
};
