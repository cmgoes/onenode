import { ethers } from "ethers";
import MKSContractAbi from "../constants/abis/mks.json";
import { MKSContractAddress } from "../constants/contracts";


const provider = new ethers.providers.Web3Provider(window.ethereum);
const MKScontract = new ethers.Contract(MKSContractAddress, MKSContractAbi, provider);

export default async function UseMint(account, amount) {  
  const currency = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
  const pricepertoken = 0;  
  const proofs = ['0x0000000000000000000000000000000000000000000000000000000000000000'];
  console.log("proofs", proofs, typeof proofs)
  const maxquantity = 0;
  await MKScontract.connect(provider.getSigner()).claim(
    account, 
    amount, 
    currency, 
    pricepertoken, 
    proofs, 
    maxquantity,
    { value: ethers.utils.parseEther("0.01") }
  );  
}
