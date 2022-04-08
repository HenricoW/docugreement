export const shortAddress = (addr: string, numChars: number = 4) =>
  addr.slice(0, numChars + 2) + "..." + addr.slice(-1 * numChars);

export const capatalize = (txt: string) =>
  txt
    .toLowerCase()
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
