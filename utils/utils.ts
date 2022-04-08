export const shortAddress = (addr: string, numChars: number = 4) =>
  addr.slice(0, numChars + 2) + "..." + addr.slice(-1 * numChars);
