import { ethers } from "ethers";
import { useState, useEffect } from "react";

const provider = new ethers.providers.Web3Provider(window.ethereum);

export const UseMint = async (contract, account, amount) => {  
  const currency = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
  const pricepertoken = 0;  
  const proofs = ['0x0000000000000000000000000000000000000000000000000000000000000000'];
  console.log("proofs", proofs, typeof proofs)
  const maxquantity = 0;  
  await contract.connect(provider.getSigner()).claim(
    account, 
    amount, 
    currency, 
    pricepertoken, 
    proofs, 
    maxquantity,
    { value: ethers.utils.parseEther("0.01") }
  );       
}

export const UseBalanceOf = (contract, account) => {
  const [totalNum, setTotalNum] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const totalNum_ = await contract.balanceOf(account);
      setTotalNum(totalNum_);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);
  return ethers.BigNumber.from(totalNum).toNumber();
}
