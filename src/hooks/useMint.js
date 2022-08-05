import { ethers } from "ethers";
import { useState, useEffect, useMemo } from "react";

const provider = new ethers.providers.Web3Provider(window.ethereum);

export const UseMint = async (contract, account, amount, mintprice) => {  
  const currency = '0xAD522217E64Ec347601015797Dd39050A2a69694';   
  const proofs = ['0x0000000000000000000000000000000000000000000000000000000000000000'];
  console.log("proofs", proofs, typeof proofs)
  const maxquantity = 0;  
  await contract.connect(provider.getSigner()).claim(
    account, 
    amount, 
    currency, 
    (mintprice*10**18).toString(), 
    proofs, 
    maxquantity
    // { value: ethers.utils.parseEther("0.01") }
  );       
}

export const UseNFTBalanceOf = (contract, account) => {
  const [totalNum, setTotalNum] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      if(account) {
        const totalNum_ = await contract.balanceOf(account);
        setTotalNum(totalNum_);
      }      
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);
  let temp = useMemo(() => {
    return totalNum.toString();
  }, [totalNum])
  return temp;  
}

