import { useState, useEffect, useMemo } from "react";
import { ethers } from "ethers";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import RegisterABI from "../constants/abis/fantomregister.json";

interface IProps {
  contract: string,
  provider: StaticJsonRpcProvider | JsonRpcProvider,
}

export const UseRegister = async({ contract, provider } : IProps) => {   
  const signer = provider.getSigner(); 
  const Contract = new ethers.Contract(contract, RegisterABI, signer);
  await Contract.Register();   
}

export const UseClaim = async ({ contract, provider } : IProps) => {
  const signer = provider.getSigner(); 
  const Contract = new ethers.Contract(contract, RegisterABI, signer);
  await Contract.Claim();   
}

interface IRead {
  contract: string,
  provider: StaticJsonRpcProvider | JsonRpcProvider,
  address: string,
}

export const UseMultiplier = ({ contract, provider, address } : IRead) => {  
  const Contract = new ethers.Contract(contract, RegisterABI, provider);
  const [totalMultiplier, setTotalMultiplier] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      if(address) {
        const totalMultiplier_ = await Contract.GetMultiplier(address);
        setTotalMultiplier(totalMultiplier_);
      }      
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  let temp = useMemo(() => {
    return totalMultiplier.toString();
  }, [totalMultiplier])  
  return temp;  
}

export const UseUnclaimedRewards = ({ contract, provider, address } : IRead) => {  
  const Contract = new ethers.Contract(contract, RegisterABI, provider);
  const [totalUnclaimedRewards, setTotalUnclaimedRewards] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      if(address) {
        const totalUnclaimedRewards_ = await Contract.CheckUnclaimedRewards(address);      
        setTotalUnclaimedRewards(totalUnclaimedRewards_._hex);
      }      
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  let temp = useMemo(() => {
     return totalUnclaimedRewards / 10**18;
  }, [totalUnclaimedRewards])  
  return temp.toFixed(7);    
}