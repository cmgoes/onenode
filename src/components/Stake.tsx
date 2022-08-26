import { DaiStakeOneContractAddress } from "../constants/contracts";
import { DaiStakeTwoContractAddress } from "../constants/contracts";

import StakeNftCard from "./StakeNftCard";
import "../index.css";

export default function Stake() {
  const data = [
    {
      lockingperiod: '15 days',
      apy: '14.71%',
      stake: DaiStakeOneContractAddress,
    },
    {
      lockingperiod: '30 days',
      apy: '29.60%',
      stake: DaiStakeTwoContractAddress,
    },
  ];

  const StakeNFTCardList = data.map((index) => {
    return (
      <StakeNftCard 
        lockingperiod={index.lockingperiod} 
        apy={index.apy}
        stake={index.stake}
      />
    )    
  })

  return (
    <div className="flex flex-col container lg:px-10 h-[100%]">
      <div className="stakeNftCntr">
        {StakeNFTCardList}
      </div>
    </div>
  );
}
