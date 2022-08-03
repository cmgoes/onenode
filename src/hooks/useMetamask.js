import { useEthers } from "@usedapp/core";

const useMetaMask = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers();

  return {
    activateBrowserWallet,
    account,
    deactivate,
  };
};

export default useMetaMask;
