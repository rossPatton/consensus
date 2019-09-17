export const range = async function* (range: number, startAtOne: boolean = false) {
  let i = startAtOne ? 1 : 0;
  while (i < range) {
    yield i++;
  }
};
