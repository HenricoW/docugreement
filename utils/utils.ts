export const shortAddress = (addr: string, numChars: number = 4) =>
  addr.slice(0, numChars + 2) + "..." + addr.slice(-1 * numChars);

export const capatalize = (txt: string) =>
  txt
    .toLowerCase()
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

export const formatBytes = (bytes: number | string, decimals = 2) => {
  if (typeof bytes === "string") bytes = +bytes;
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const bundlrUrl = "https://devnet.bundlr.network";
export const tokenName = "matic";
export const tokenAddr = "";
