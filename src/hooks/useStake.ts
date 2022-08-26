import { useState, useEffect, useMemo } from "react";
import { ethers } from "ethers";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import StakeABI from "../constants/abis/stake.json";

interface IProps {
  spender: string,
  provider: StaticJsonRpcProvider | JsonRpcProvider,
}

interface IStakes {
  spender: string,
  provider: StaticJsonRpcProvider | JsonRpcProvider,
  amount: string,
}

export const UseStake = async({ spender, provider, amount } : IStakes) => { 
  const signer = provider.getSigner();    
  const Contract = new ethers.Contract(spender, StakeABI, signer);
  await Contract.deposit(amount).then(() => {
    window.location.reload()
  });     
}

export const UseUnStake = async({ spender, provider } : IProps) => {
  const signer = provider.getSigner(); 
  const Contract = new ethers.Contract(spender, StakeABI, signer);    
  await Contract.claimAndWithdraw().then(() => {
    window.location.reload()
  });  
}

export const UseClaim = async({ spender, provider } : IProps) => { 
  const signer = provider.getSigner(); 
  const Contract = new ethers.Contract(spender, StakeABI, signer);     
  await Contract.claim();
}

interface IReads {
  spender: string,
  provider: StaticJsonRpcProvider | JsonRpcProvider,
  address: string,
}

export const UseCalculateReward = ({ spender, provider, address } : IReads) => {  
  const Contract = new ethers.Contract(spender, StakeABI, provider);
  const [reward, setReward] = useState(0);  
  useEffect(() => {
    const fetchData = async () => {
      if (address) {        
        const reward_ = await Contract.CalculateReward(address);
        setReward(reward_._hex);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, [address]);
  let temp = useMemo(() => {
    return reward / 10**18;
 }, [reward])
  return temp;
}

export const UseCalculateStaked = ({ spender, provider, address } : IReads) => {  
  const Contract = new ethers.Contract(spender, StakeABI, provider);
  const [staked, setStaked] = useState(0);  
  useEffect(() => {
    const fetchData = async () => {
      if (address) {        
        const staked_ = await Contract.StakedTokens(address);
        setStaked(staked_._hex);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, [address]);
  let temp = useMemo(() => {
    return staked / 10**18;
 }, [staked])
  return temp;
}
