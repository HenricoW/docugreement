import Web3 from "web3";
import Web3Modal from "web3modal";

const providerOptions = {};

export const getWeb3 = async () => {
  const w3modal = new Web3Modal({ cacheProvider: true, providerOptions });

  let provider;
  try {
    provider = await w3modal.connect();
  } catch (err: any) {
    throw new Error(err);
  }

  const web3 = new Web3(provider);

  return { web3, provider };
};
