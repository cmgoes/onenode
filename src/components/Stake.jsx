import { ethers } from "ethers";
import NokoABI from "../constants/abis/noko.json";
import StakeABI from "../constants/abis/stake.json";

import { NokoContractAddress } from "../constants/contracts";
import { StakeContractOneAddress } from "../constants/contracts";

import StakeNftCard from "./StakeNftCard";
import "../index.css";
import fantom from "../assets/fantom.png";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const NokoContract = new ethers.Contract(NokoContractAddress, NokoABI, provider);
const StakeOneContract = new ethers.Contract(StakeContractOneAddress, StakeABI, provider);
export default function Stake(props) {
  return (
    <div className="flex flex-col container lg:px-10 h-[100%]">
      <div className="stakeNftCntr">
        <StakeNftCard icon={fantom} approve={NokoContract} stake={StakeOneContract} stakeaddress={StakeContractOneAddress}/>
        <StakeNftCard icon={fantom} approve={NokoContract} stake={StakeOneContract} stakeaddress={StakeContractOneAddress}/>
      </div>
    </div>
  );
}
