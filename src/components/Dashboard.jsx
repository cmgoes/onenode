import { ethers } from "ethers";

import FantomRegisterABI from "../constants/abis/fantomregister.json";
// import PumpkinRegisterABI from "../constants/abis/pumpkinregister.json";
// import TombRegisterABI from "../constants/abis/tombregister.json";
// import DaiRegisterABI from "../constants/abis/dairegister.json";

import { FantomRegisterNFTAddress } from "../constants/contracts";
import { PumpkinRegisterNFTAddress } from "../constants/contracts";
import { TombRegisterNFTAddress } from "../constants/contracts";
import { DaiRegisterNFTAddress } from "../constants/contracts";

import RegisterNft from "./RegisterNftCard.jsx";
import daiIcon from "../assets/dai.png";
import fantomIcon from "../assets/fantom.png";
import pumpkinIcon from "../assets/pumpkin.png";
import tombIcon from "../assets/tomb.png";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const FantomRegisterContract = new ethers.Contract(FantomRegisterNFTAddress, FantomRegisterABI, provider);
const PumpkinRegisterContract = new ethers.Contract(PumpkinRegisterNFTAddress, FantomRegisterABI, provider);
const TombRegisterContract = new ethers.Contract(TombRegisterNFTAddress, FantomRegisterABI, provider);
const DaiRegisterContract = new ethers.Contract(DaiRegisterNFTAddress, FantomRegisterABI, provider);

export default function Dashboard(props) {
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
          {/* <div className="actionAllBtnCntr">
            <div className="btn fantom" style={{ "margin-top": "10px" }}>
              Register to all
            </div>
            <div className="btn fantom" style={{ "margin-top": "10px" }}>
              Claim all rewards
            </div>                    
          </div> */}
        </div>
      </div>
      <div className="registerNftCntr">
        <RegisterNft icon={fantomIcon} className={" fantom"} contract={FantomRegisterContract} />
        <RegisterNft icon={pumpkinIcon} className={" pumpkin"} contract={PumpkinRegisterContract} />
        <RegisterNft icon={tombIcon} className={" tomb"} contract={TombRegisterContract} />
        <RegisterNft icon={daiIcon} className={" dai"} contract={DaiRegisterContract}/>
      </div>
    </div>
  );
}
