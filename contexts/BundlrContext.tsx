import { WebBundlr } from "@bundlr-network/client";
import { FC, ReactNode, createContext, useState } from "react";
import { bundlrUrl, tokenName } from "../utils/utils";

interface BundlrContext {
  bundlr: WebBundlr | undefined;
  bundlrConnect: (provider: any) => Promise<void>;
  bundlrEstimate: (size: number) => Promise<string>;
}

interface BundlrContextProps {
  children: ReactNode;
}

const BundlrContextDefaultValues: BundlrContext = {
  bundlr: undefined,
  bundlrConnect: async (provider: any) => {},
  bundlrEstimate: async (size: number) => "",
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

  return (
    <BundlrContext.Provider
      value={{
        bundlr,
        bundlrConnect,
        bundlrEstimate,
      }}
    >
      {children}
    </BundlrContext.Provider>
  );
};

export default BundlrContext;

export { BundlrProvider };
