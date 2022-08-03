import { ethers } from "ethers";
import RegisterABI from "../constants/abis/fantomregister.json";
import { FantomRegisterNFTAddress } from "../constants/contracts";
import { PumpkinRegisterNFTAddress } from "../constants/contracts";
import { TombRegisterNFTAddress } from "../constants/contracts";
import { DaiRegisterNFTAddress } from "../constants/contracts";

import RegisterNft from "./RegisterNftCard.jsx";
import daiIcon from "../assets/dai.png";
import fantomIcon from "../assets/fantom.png";
import pumpkinIcon from "../assets/pumpkin.png";
import tombIcon from "../assets/tomb.jpeg";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const FantomRegisterContract = new ethers.Contract(FantomRegisterNFTAddress, RegisterABI, provider);
const PumpkinRegisterContract = new ethers.Contract(PumpkinRegisterNFTAddress, RegisterABI, provider);
const TombRegisterContract = new ethers.Contract(TombRegisterNFTAddress, RegisterABI, provider);
const DaiRegisterContract = new ethers.Contract(DaiRegisterNFTAddress, RegisterABI, provider);

export default function Dashboard(props) {
  return (
    <div className="flex flex-col container lg:px-10 h-[100%]">
      <div className="infoCard">
        <div className="infoCardHeading">Dashboard</div>
        <div className="infoCardData">
          <div className="infoCardText">
            Earn rewards by staking your NFTs to different plans and get
            respective rewards. Just register to the plans and get rewards.
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
