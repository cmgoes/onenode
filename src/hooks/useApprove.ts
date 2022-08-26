import { useState, useEffect, useMemo } from "react";
import { ethers } from "ethers";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import PumpkinContractABI from "../constants/abis/pumpkin.json";
import RewardABI from "../constants/abis/reward.json";
import { RewardContractAddress } from "../constants/contracts";
import { PumpkinContractAddress } from "../constants/contracts";

interface IApprove {  
  token: string,
  provider: StaticJsonRpcProvider | JsonRpcProvider,
  spender: string,  
}

export const UseApprove = async({ token, provider, spender } : IApprove) => {   
  const signer = provider.getSigner();
  const PumpkinContract = new ethers.Contract(PumpkinContractAddress, PumpkinContractABI, signer);
  const RewardContract = new ethers.Contract(RewardContractAddress, RewardABI, signer);
  if(token === PumpkinContractAddress) {
    await PumpkinContract.approve(spender, ethers.constants.MaxUint256); 
  } else {
    await RewardContract.approve(spender, ethers.constants.MaxUint256);
  }
     
}

interface IAllowance {  
  token: string,
  provider: StaticJsonRpcProvider | JsonRpcProvider,
  address: string,
  spender: string,
}

export const UseAllowance = ({ token, provider, address, spender } : IAllowance) => {  
  const PumpkinContract = new ethers.Contract(PumpkinContractAddress, PumpkinContractABI, provider);
  const RewardContract = new ethers.Contract(RewardContractAddress, RewardABI, provider);
  const [allowance, setAllowance] = useState(0);  
  useEffect(() => {
    const fetchData = async () => {
      if (address) {
        if(token === PumpkinContractAddress) {
          const allowance_ = await PumpkinContract.allowance(address, spender);
          setAllowance(allowance_._hex);
        } else {
          const allowance_ = await RewardContract.allowance(address, spender);
          setAllowance(allowance_._hex);
        }        
        
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  let temp = useMemo(() => {
    return allowance / 10**18;
 }, [allowance])
  return temp;
}

interface IBalanceOf {  
  token: string,
  provider: StaticJsonRpcProvider | JsonRpcProvider,
  address: string,  
}

export const UseBalanceOf = ({ token, provider, address} : IBalanceOf) => {  
  const PumpkinContract = new ethers.Contract(PumpkinContractAddress, PumpkinContractABI, provider);
  const RewardContract = new ethers.Contract(RewardContractAddress, RewardABI, provider);
  const [totalNum, setTotalNum] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      if(address) {
        if(token === PumpkinContractAddress) {
          const totalNum_ = await PumpkinContract.balanceOf(address);
          setTotalNum(totalNum_._hex);
        } else {
          const totalNum_ = await RewardContract.balanceOf(address);
          setTotalNum(totalNum_._hex);
        }        
      }      
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  let temp = useMemo(() => {
    return totalNum / 10**18;
  }, [totalNum])
  return temp;  
}