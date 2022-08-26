import { FantomRegisterNFTAddress } from "../constants/contracts";
import { PumpkinRegisterNFTAddress } from "../constants/contracts";
import { TombRegisterNFTAddress } from "../constants/contracts";
import { DaiRegisterNFTAddress } from "../constants/contracts";

import RegisterNft from "./RegisterNftCard";
import daiIcon from "../assets/dai.png";
import fantomIcon from "../assets/fantom.png";
import pumpkinIcon from "../assets/pumpkin.png";
import tombIcon from "../assets/tomb.png";

const data = [
  {
    icon: fantomIcon,
    className: " fantom",
    contract: FantomRegisterNFTAddress,
  },
  {
    icon: pumpkinIcon,
    className: " pumpkin",
    contract: PumpkinRegisterNFTAddress,
  },
  {
    icon: tombIcon,
    className: " tomb",
    contract: TombRegisterNFTAddress,
  },
  {
    icon: daiIcon,
    className: " dai",
    contract: DaiRegisterNFTAddress,
  }
];

const RegisterNFTList = data.map(index => {
  return (
    <RegisterNft 
      icon={index.icon}
      className={index.className}
      contract={index.contract}
    />    
  );
})

export default function Dashboard() {
  return (
    <div className="flex flex-col container lg:px-10 h-[100%]">
      <div className="infoCard">
        <div className="infoCardHeading">Dashboard</div>
        <div className="infoCardData">
          <div className="infoCardText">
            90% of rewards are generated through the Binance exchange staking and locked staking programs
            <br />
            10% of rewards are generated through an auto-trading bot operating on the Binance exchange 
            <br /><br />
            <strong>to request a Monthly PNL report email us at  : vplug10@gmail.com</strong>    
            <br />         
            <strong>NOTE : reports are only available at the end of every month</strong>
          </div>          
        </div>
      </div>
      <div className="registerNftCntr">
        {RegisterNFTList}
      </div>
    </div>
  );
}
