import { ethers } from "ethers";
import { useState, useEffect, useMemo } from "react";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import MINTABI from "../constants/abis/mint.json";
import NodeABI from "../constants/abis/node.json";
import { NodeContractAddress } from "../constants/contracts";

interface IMint {  
  spender: string,
  provider: StaticJsonRpcProvider | JsonRpcProvider,
  address: string,
  mintprice: number,      
}

export const UseMint = async ({ spender, provider, address, mintprice } : IMint) => {  
  const signer = provider.getSigner();
  const Contract = new ethers.Contract(spender, MINTABI, signer);
  const currency = '0xAD522217E64Ec347601015797Dd39050A2a69694';   
  const proofs = ['0x0000000000000000000000000000000000000000000000000000000000000000'];
  const amount = 1;
  console.log("proofs", proofs, typeof proofs)
  const maxquantity = 0;  
  await Contract.claim(
    address, 
    amount, 
    currency, 
    (mintprice*10**18).toString(), 
    proofs, 
    maxquantity
    // { value: ethers.utils.parseEther("0.01") }
  );       
}

interface INFTBalance {  
  spender: string,
  provider: StaticJsonRpcProvider | JsonRpcProvider,
  address: string,      
}

export const UseNFTBalanceOf = ({ spender, provider, address } : INFTBalance) => {  
  const Contract = new ethers.Contract(spender, MINTABI, provider);
  const NodeContract = new ethers.Contract(spender, NodeABI, provider);
  const [totalNum, setTotalNum] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      if(address) {
        if(spender !== NodeContractAddress) {
          const totalNum_ = await Contract.balanceOf(address);
          setTotalNum(totalNum_);
        } else {
          const totalNum_ = await NodeContract.balanceOf(address);
          setTotalNum(totalNum_);
        }        
        
      }      
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  let temp = useMemo(() => {
    return totalNum.toString();
  }, [totalNum])
  return temp;  
}

