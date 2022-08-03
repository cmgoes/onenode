import { useState, useEffect, useMemo } from "react";
import { ethers } from "ethers";
const provider = new ethers.providers.Web3Provider(window.ethereum);

export const UseStake = async(contract, amount) => {    
  await contract.connect(provider.getSigner()).deposit(amount);    
}

export const UseUnStake = async(contract) => {    
  await contract.connect(provider.getSigner()).claimAndWithdraw();  
}

export const UseClaim = async(contract) => {    
  await contract.connect(provider.getSigner()).claim();  
}

export const UseAllowance = (contract, account, spender) => {
  const [allowance, setAllowance] = useState(0);  
  useEffect(() => {
    const fetchData = async () => {
      if (account) {        
        const allowance_ = await contract.allowance(account, spender);
        setAllowance(allowance_._hex);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, [account]);
  let temp = useMemo(() => {
    return allowance / 10**18;
 }, [allowance])
  return temp;
}