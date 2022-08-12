import { useEthers } from "@usedapp/core";

const useMetaMask = () => {
  const { activate, account, deactivate } = useEthers();

  return {
    activate,
    account,
    deactivate,
  };
};

export default useMetaMask;
