import { FC, ReactNode, createContext, useState, useEffect } from "react";
import { getWeb3 } from "../utils/web3";

interface Web3Context {
  w3Inst: any;
  setW3Inst: (w3Inst: any) => void;
  provider: any;
  setProvider: (provider: any) => void;
  walletAddr: string;
  setWalletAddr: (address: string) => void;
  chainId: number;
  setChainId: (chainId: number) => void;
  w3connect: () => Promise<void>;
}

interface Web3ContextProps {
  children: ReactNode;
}

const Web3ContextDefaultValues: Web3Context = {
  w3Inst: null,
  setW3Inst: (w3Inst: any) => {},
  provider: null,
  setProvider: (provider: any) => {},
  walletAddr: "",
  setWalletAddr: (address: string) => {},
  chainId: 0,
  setChainId: (chainId: number) => {},
  w3connect: async () => {},
};

const Web3Context = createContext<Web3Context>(Web3ContextDefaultValues);

const Web3Provider: FC<Web3ContextProps> = ({ children }) => {
  const [w3Inst, setW3Inst] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [walletAddr, setWalletAddr] = useState("");
  const [chainId, setChainId] = useState(0);

  const w3connect = async () => {
    let _web3, _provider, _w3inst;
    try {
      const W3Objects = await getWeb3();
      _provider = W3Objects.provider;
      _w3inst = W3Objects.w3instance;
      const userAccounts = await _provider.send("eth_requestAccounts", []);

      setProvider(_provider);
      setW3Inst(_w3inst);
      setWalletAddr(userAccounts?.[0] ?? "");
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (w3Inst) {
      w3Inst.on("accountsChanged", (accounts: string[]) => {
        setWalletAddr(accounts[0]);
        console.log(accounts[0]);
      });
      w3Inst.on("connect", (info: { chainId: number }) => setChainId(info.chainId));
      w3Inst.on("chainChanged", (chainID: number) => setChainId(chainID));
      w3Inst.on("disconnect", (error: { code: number; message: string }) => {
        if (error) {
          console.log("Error disconnecting provider:");
          console.log("Error code: ", error.code, " Message: ", error.message);
        }

        setProvider(null);
        setWalletAddr("");
        setChainId(0);
      });
    }
  }, [provider]);

  return (
    <Web3Context.Provider
      value={{
        w3Inst,
        setW3Inst,
        provider,
        setProvider,
        walletAddr,
        setWalletAddr,
        chainId,
        setChainId,
        w3connect,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Context;

export { Web3Provider };
