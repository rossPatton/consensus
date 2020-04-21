// gets rounded random num between 2 points
export const getRandomNum = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);
