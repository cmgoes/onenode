import { useState, useEffect, useMemo } from "react";
import { ethers } from "ethers";
const provider = new ethers.providers.Web3Provider(window.ethereum);

export const UseApprove = async(contract, spender, token) => {    
  await contract.connect(provider.getSigner()).approve(spender, token);    
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

export const UseBalanceOf = (contract, account) => {
  const [totalNum, setTotalNum] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      if(account) {
        const totalNum_ = await contract.balanceOf(account);
        setTotalNum(totalNum_._hex);
      }      
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);
  let temp = useMemo(() => {
    return totalNum / 10**18;
  }, [totalNum])
  return temp;  
}