import { useState } from "react";
import {UseRegister, UseClaim, UseMultiplier, UseUnclaimedRewards} from "../hooks/useRegister";
import { UseNFTBalanceOf } from "../hooks/useMint";
import { NodeContractAddress } from "../constants/contracts";
import waitingComponent from "./MessageBox/WaitingComponent";
import emptyComponent from "./MessageBox/EmptyComponent";
import { useWeb3Context } from "../hooks";
import { useAddress } from "../hooks/web3-context";

import "../index.css";
import fantomIcon from "../assets/fantom.png";

interface Props {
  icon: string,
  className: string,
  contract: string,
}

export default function RegisterNft({ icon, className, contract} : Props) {
  const { provider } = useWeb3Context();
  const address =useAddress();
  const spender = NodeContractAddress;
  const [waitingBox, setWaitingBox] = useState(emptyComponent);
  const balance = UseNFTBalanceOf({ spender, provider, address });  
  const reward = UseUnclaimedRewards({ contract, provider, address });  
  const registered = UseMultiplier({ contract, provider, address });    

  const usehandleRegister = async () => {  
    if(balance === '0') {
      setWaitingBox(waitingComponent("You do not have any nfts to register"));
      setTimeout(function(){
        setWaitingBox(emptyComponent)
      }, 1000);
    } else {
      await UseRegister({ contract, provider });
    }            
  };

  const usehandleClaim = async () => {   
    if(reward === '0.0000000') {
      setWaitingBox(waitingComponent("You do not have any registered nfts"));
      setTimeout(function(){
        setWaitingBox(emptyComponent)
      }, 1000);
    } else {
      await UseClaim({ contract, provider });
    }                  
  };


  return (
    <div className="cardContainer">
      <div className="cardHeading">
        Register To Earn
        <img src={icon ? icon : fantomIcon} className="cardLogo" alt="Card Logo"/>
      </div>
      <div className="cardBody">
        <div className="cardDataCntr">
          <div className="dataHeading">{"Total Registered:"}</div>
          <div className="data">{address? registered + '/100' : '0/100'}</div>
        </div>        
        <div className="cardDataCntr">
          <div className="dataHeading" style={{"width":"55%"}}>{"Unclaimed Rewards:"}</div>
          <div className="data" style={{"width":"45%"}}>{address? reward : '0'}</div>
        </div>
        <div className="btnCntr">
          {address? <div className={"btn " + className} onClick={usehandleRegister}>Register</div> : 
          <div className={"btn " + className} style={{pointerEvents: 'none', userSelect: 'none'}}>Register</div>}          
          {address? <div className={"btn " + className} onClick={usehandleClaim}>Claim</div> : 
          <div className={"btn " + className} style={{pointerEvents: 'none', userSelect: 'none'}}>Claim</div>}
        </div>
      </div>
      {waitingBox}
    </div>
  );
}
