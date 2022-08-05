import { useState, useEffect, useMemo } from "react";
import { ethers } from "ethers";
const provider = new ethers.providers.Web3Provider(window.ethereum);

export const UseStake = async(contract, amount) => {    
  await contract.connect(provider.getSigner()).deposit(amount).then((tx) => {
    window.location.reload()
  });     
}

export const UseUnStake = async(contract) => {    
  await contract.connect(provider.getSigner()).claimAndWithdraw().then((tx) => {
    window.location.reload()
  });  
}

export const UseClaim = async(contract) => {    
  await contract.connect(provider.getSigner()).claim();
}

export const UseCalculateReward = (contract, account) => {
  const [reward, setReward] = useState(0);  
  useEffect(() => {
    const fetchData = async () => {
      if (account) {        
        const reward_ = await contract.CalculateReward(account);
        setReward(reward_);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, [account]);
  let temp = useMemo(() => {
    return reward.toString();
 }, [reward])
  return temp;
}

export const UseCalculateStaked = (contract, account) => {
  const [staked, setStaked] = useState(0);  
  useEffect(() => {
    const fetchData = async () => {
      if (account) {        
        const staked_ = await contract.StakedTokens(account);
        setStaked(staked_._hex);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, [account]);
  let temp = useMemo(() => {
    return staked / 10**18;
 }, [staked])
  return temp;
}
