import { useState, useEffect, useMemo } from "react";
import { ethers } from "ethers";
const provider = new ethers.providers.Web3Provider(window.ethereum);

export const UseRegister = async(contract) => {    
  await contract.connect(provider.getSigner()).Register();   
}

export const UseClaim = async (contract) => {
  await contract.connect(provider.getSigner()).Claim();   
}

export const UseMultiplier = (contract, account) => {
  const [totalMultiplier, setTotalMultiplier] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      if(account) {
        const totalMultiplier_ = await contract.GetMultiplier(account);
       setTotalMultiplier(totalMultiplier_);
      }      
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);
  let temp = useMemo(() => {
    return totalMultiplier.toString();
  }, [totalMultiplier])  
  return temp;  
}

export const UseUnclaimedRewards = (contract, account) => {
  const [totalUnclaimedRewards, setTotalUnclaimedRewards] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      if(account) {
        const totalUnclaimedRewards_ = await contract.CheckUnclaimedRewards(account);      
        setTotalUnclaimedRewards(totalUnclaimedRewards_._hex);
      }      
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);
  let temp = useMemo(() => {
     return totalUnclaimedRewards / 10**18;
  }, [totalUnclaimedRewards])  
  return temp.toFixed(7);    
}