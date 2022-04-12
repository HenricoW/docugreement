import { WebBundlr } from "@bundlr-network/client";
import { FC, ReactNode, createContext, useState } from "react";
import { bundlrUrl, tokenName } from "../utils/utils";

interface BundlrContext {
  bundlr: WebBundlr | undefined;
  bundlrConnect: (provider: any) => Promise<void>;
  bundlrEstimate: (size: number) => Promise<string>;
  uploadBuffer: (
    fileBuffer: Buffer,
    tags: {
      name: string;
      value: string;
    }[]
  ) => Promise<string>;
}

interface BundlrContextProps {
  children: ReactNode;
}

const BundlrContextDefaultValues: BundlrContext = {
  bundlr: undefined,
  bundlrConnect: async (provider: any) => {},
  bundlrEstimate: async (size: number) => "",
  uploadBuffer: async (
    fileBuffer: Buffer,
    tags: {
      name: string;
      value: string;
    }[]
  ) => "",
};

const BundlrContext = createContext<BundlrContext>(BundlrContextDefaultValues);

const BundlrProvider: FC<BundlrContextProps> = ({ children }) => {
  const [bundlr, setBundlr] = useState<WebBundlr>();

  const bundlrConnect = async (provider: any) => {
    const _bundlr = new WebBundlr(bundlrUrl, tokenName, provider);
    _bundlr
      .ready()
      .then(() => setBundlr(_bundlr))
      .catch((err) => console.log(err));
  };

  const bundlrEstimate = async (size: number) => {
    let val;
    try {
      val = await bundlr?.getPrice(size);
      val = bundlr?.utils.unitConverter(val || 0);

      return val?.toString() || "0";
    } catch (err) {
      console.log(err);
      return "0";
    }
  };

  const uploadBuffer = async (fileBuffer: Buffer, tags: { name: string; value: string }[]) => {
    if (bundlr) {
      try {
        const tx = bundlr.createTransaction(fileBuffer, { tags });
        await tx.sign();
        console.log("Transaction ID: ", tx.id);

        const resp = await tx.upload();
        console.log("upload resp : ", resp);

        return tx.id;
      } catch (err) {
        console.log("Upload file error: ", err);
        return "";
      }
    }

    return "";
  };

  return (
    <BundlrContext.Provider
      value={{
        bundlr,
        bundlrConnect,
        bundlrEstimate,
        uploadBuffer,
      }}
    >
      {children}
    </BundlrContext.Provider>
  );
};

export default BundlrContext;

export { BundlrProvider };
