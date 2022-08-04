import { ethers } from "ethers";
import RewardABI from "../constants/abis/reward.json";
import StakeABI from "../constants/abis/stake.json";

import { RewardContractAddress } from "../constants/contracts";
import { DaiStakeOneContractAddress } from "../constants/contracts";
import { DaiStakeTwoContractAddress } from "../constants/contracts";

import StakeNftCard from "./StakeNftCard";
import "../index.css";
import dai from "../assets/dai.png";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const RewardContract = new ethers.Contract(RewardContractAddress, RewardABI, provider);
const StakeOneContract = new ethers.Contract(DaiStakeOneContractAddress, StakeABI, provider);
const StakeTwoContract = new ethers.Contract(DaiStakeTwoContractAddress, StakeABI, provider);
export default function Stake(props) {
  return (
    <div className="flex flex-col container lg:px-10 h-[100%]">
      <div className="stakeNftCntr">
        <StakeNftCard icon={dai} lockingperiod="15 days" apy="20.43%" approve={RewardContract} stake={StakeOneContract} stakeaddress={DaiStakeOneContractAddress}/>
        <StakeNftCard icon={dai} lockingperiod="30 days" apy="29.60%" approve={RewardContract} stake={StakeTwoContract} stakeaddress={DaiStakeTwoContractAddress}/>
      </div>
    </div>
  );
}
