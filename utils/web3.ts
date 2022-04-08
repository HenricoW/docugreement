import { ethers } from "ethers";
import Web3Modal from "web3modal";

const providerOptions = {};

export const getWeb3 = async () => {
  const w3modal = new Web3Modal({ cacheProvider: true, providerOptions });

  let w3instance;
  try {
    w3instance = await w3modal.connect();
  } catch (err: any) {
    throw new Error(err);
  }

  const provider = new ethers.providers.Web3Provider(w3instance);
  await provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();

  return { provider, signer, w3instance: w3instance as ethers.providers.Web3Provider };
};
