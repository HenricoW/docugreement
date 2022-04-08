import { FC, ReactNode, createContext, useState, useEffect } from "react";
import { getWeb3 } from "../utils/web3";
import Web3 from "web3";

interface Web3Context {
  web3: Web3 | undefined;
  setWeb3: (web3: Web3 | undefined) => void;
  w3Provider: any;
  setW3Provider: (provider: any) => void;
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
  web3: undefined,
  setWeb3: (web3: Web3 | undefined) => {},
  w3Provider: null,
  setW3Provider: (provider: any) => {},
  walletAddr: "",
  setWalletAddr: (address: string) => {},
  chainId: 0,
  setChainId: (chainId: number) => {},
  w3connect: async () => {},
};

const Web3Context = createContext<Web3Context>(Web3ContextDefaultValues);

const Web3Provider: FC<Web3ContextProps> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3>();
  const [w3Provider, setW3Provider] = useState<any>(null);
  const [walletAddr, setWalletAddr] = useState("");
  const [chainId, setChainId] = useState(0);

  const w3connect = async () => {
    let _web3, _provider;
    try {
      const W3Objects = await getWeb3();
      _web3 = W3Objects.web3;
      _provider = W3Objects.provider;
      const userAccounts = await _web3?.eth.getAccounts();

      setWeb3(_web3);
      setW3Provider(_provider);
      setWalletAddr(userAccounts?.[0] ?? "");
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (w3Provider) {
      w3Provider.on("accountsChanged", (accounts: string[]) => setWalletAddr(accounts[0]));
      w3Provider.on("connect", (info: { chainId: number }) => setChainId(info.chainId));
      w3Provider.on("chainChanged", (chainID: number) => {
        setChainId(chainID);
        window.location.reload();
      });
      w3Provider.on("disconnect", (error: { code: number; message: string }) => {
        if (error) {
          console.log("Error disconnecting provider:");
          console.log("Error code: ", error.code, " Message: ", error.message);
        }

        setWeb3(undefined);
        setW3Provider(null);
        setWalletAddr("");
        setChainId(0);
      });
    }
  }, [w3Provider]);

  return (
    <Web3Context.Provider
      value={{
        web3,
        setWeb3,
        w3Provider,
        setW3Provider,
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
