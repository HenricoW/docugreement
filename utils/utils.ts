import { ethers } from "ethers";
import { PDFDocument, StandardFonts } from "pdf-lib";

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

export const toDecimals = (num: string, dec: number = 3) => {
  if (num.includes(".")) {
    const [integer, fraction] = num.split(".");
    const shortened = fraction.slice(0, dec);
    return [integer, shortened].join(".");
  }

  return num;
};

export const argql = "https://arweave.net/graphql";
export const allowedFileType = "application/pdf";
export const one_mb = 1024 ** 2;

// live net setup
export const tokenAddr = "";
export const bundlrUrl = "https://node2.bundlr.network/";
export const requiredChainID = 137;
export const tokenName = "matic";
export const requiredChainName = "Polygon";

// testnet setup
// export const bundlrUrl = "https://devnet.bundlr.network";

// export const tokenName = "matic";
// export const requiredChainID = 80001;
// export const requiredChainName = "Polygon Mumbai";

// export const tokenName = "boba";
// export const requiredChainID = 28;
// export const requiredChainName = "Boba Rinkeby";

export type SignResult = {
  url: string;
  newPdf: File;
};

export const enum DocPhase {
  created = "dg_created",
  signed1 = "dg_signed1",
  signed2 = "dg_signed2",
  published = "dg_published",
}

export const createPdfMetadata = (file: File, data: { ethAddr: string; role: string }): Promise<File> => {
  return new Promise(async (res, rej) => {
    try {
      const pdfBytes = await file.arrayBuffer();

      const pdfDoc = await PDFDocument.load(pdfBytes);
      const keywords = pdfDoc.getKeywords();
      if (keywords && keywords.includes(DocPhase.created)) rej("Document already has metadata");

      const fileFont = await pdfDoc.embedFont(StandardFonts.CourierBold);
      const newPage = pdfDoc.addPage();

      const createText = [
        "New agreement created.\n",
        "Created by:\n",
        "Eth address: \t" + data.ethAddr + "\n",
        "In role as: \t\t\t\t\t" + data.role + "\n",
        Array(charLimit).fill("_").join("") + "\n\n",
      ];

      const { height } = newPage.getSize();

      newPage.drawText(createText.join(""), {
        x: 50,
        y: height - 50,
        size: 11,
        lineHeight: 14,
        font: fileFont,
      });

      if (keywords) {
        const kwArray = keywords.split(" ");
        pdfDoc.setKeywords([...kwArray, DocPhase.created]);
      } else {
        pdfDoc.setKeywords([DocPhase.created]);
      }

      const newPdfBytes = await pdfDoc.save();
      const pdfFile = new File([newPdfBytes], file.name, { type: "application/pdf" });

      res(pdfFile);
    } catch (err: any) {
      rej(err);
    }
  });
};

export const getSig = async (file: File, ethAddr: string, provider: ethers.providers.Web3Provider) => {
  const reader = new FileReader();

  return new Promise<string>((res, rej) => {
    try {
      reader.onload = async () => {
        if (reader.result && typeof reader.result === "string") {
          const h = ethers.utils.hashMessage(reader.result);
          // const h = w3?.utils.sha3(reader.result);
          // const s = h ? await w3?.eth.sign(h, ethAddr) : "";
          console.log("hash: ", h);
          const s = h ? (await provider.getSigner()).signMessage(h) : "";
          console.log("sig: ", s);
          s ? res(s) : rej("Undefined signature");
        } else {
          rej("Invalid signature");
        }
      };

      reader.readAsBinaryString(file);
      // reader.readAsArrayBuffer(file);
    } catch (error: any) {
      console.log("getSig error: ", error.message);
      rej(error);
    }
  });
};

export const textWrapper = (text: string, charLimit: number = 60) => {
  if (text.length <= charLimit) return text;

  const multiples = Math.floor(text.length / charLimit);
  const slices = [];
  for (let i = 0; i <= multiples; i++) {
    let start = charLimit * i;
    slices[i] = text.slice(start, start + charLimit);
  }

  return slices.join("\n");
};

export const charLimit = 74;

export const getMetadata = (doc: PDFDocument) => {
  const kws = doc.getKeywords();

  return kws ? kws : "";
};

export const signPdf = (
  file: File,
  data: { docTitle: string; ethAddr: string; provider: ethers.providers.Web3Provider }
): Promise<SignResult> => {
  const { docTitle, ethAddr, provider } = data;

  return new Promise(async (res, rej) => {
    try {
      const pdfBytes = await file.arrayBuffer();

      const pdfDoc = await PDFDocument.load(pdfBytes);
      const keywords = getMetadata(pdfDoc);
      console.log("kw before sign: ", keywords);
      if (!keywords.includes(DocPhase.created)) rej("Document not uploaded via this app");

      const fileFont = await pdfDoc.embedFont(StandardFonts.CourierBold);
      const lastPage = pdfDoc.getPage(pdfDoc.getPageCount() - 1);

      const { height } = lastPage.getSize();

      if (keywords.includes(":" + ethAddr)) rej("User already signed document!");

      const sig = await getSig(file, ethAddr, provider);
      const wrappedSig = textWrapper(sig, charLimit);

      const signText = [
        "Agreement signed.\n",
        "Document title: \t\t\t\t" + docTitle + "\n\n",
        "User Eth address (signer): \t " + ethAddr + "\n",
        "User's signature of document: \n" + wrappedSig + "\n",
        Array(charLimit).fill("_").join("") + "\n\n",
      ];

      lastPage.drawText(signText.join(""), {
        x: 50,
        y: height - (keywords.includes(DocPhase.signed1) ? 320 : 160),
        size: 11,
        lineHeight: 14,
        font: fileFont,
      });

      const kwArray = keywords.split(" ");
      if (keywords.includes(DocPhase.signed1)) {
        pdfDoc.setKeywords([...kwArray, DocPhase.signed2, "s2:" + ethAddr]);
      } else {
        pdfDoc.setKeywords([...kwArray, DocPhase.signed1, "s1:" + ethAddr]);
      }

      const newPdfBytes = await pdfDoc.save();
      const pdfUrl = URL.createObjectURL(new Blob([newPdfBytes], { type: "application/pdf" }));

      // new file
      let [fname, fext] = docTitle.split(".");
      fname = fname.includes("_s1") ? fname.replace("_s1", "_s2") : fname + "_s1";
      const newFName = fname + "." + fext;
      console.log("new filename: ", newFName);
      const newFile = new File([newPdfBytes], newFName, { type: "application/pdf" });

      res({ url: pdfUrl, newPdf: newFile });
    } catch (err: any) {
      rej(err);
    }
  });
};
