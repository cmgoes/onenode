import { useState } from "react";
import { ethers } from "ethers";
// import {UseRegister, UseClaim, UseMultiplier, UseUnclaimedRewards} from "../hooks/useRegister";
import {UseRegister, UseClaim} from "../hooks/useRegister";
// import { UseNFTBalanceOf } from "../hooks/useMint";
import useMetaMask from "../hooks/useMetamask";
// import NodeContractAbi from "../constants/abis/node.json";
// import { NodeContractAddress } from "../constants/contracts";
import waitingComponent from "./MessageBox/WaitingComponent";
import emptyComponent from "./MessageBox/EmptyComponent";

import "../index.css";
import fantomIcon from "../assets/fantom.png";

const provider = new ethers.providers.Web3Provider(window.ethereum);
// const NodeContract = new ethers.Contract(NodeContractAddress, NodeContractAbi, provider);

export default function RegisterNft(props) {
  const { account } = useMetaMask();
  const [waitingBox, setWaitingBox] = useState(emptyComponent);
  // const balance = UseNFTBalanceOf(NodeContract, account);
  // const reward = UseUnclaimedRewards(props.contract, account);
  // const registered = UseMultiplier(props.contract, account);  
  const balance = 1;
  const reward = 1;
  const registered = 1;

  const usehandleRegister = async () => {  
    if(balance === '0') {
      setWaitingBox(waitingComponent("You do not have any nfts to register"));
      setTimeout(function(){
        setWaitingBox(emptyComponent)
      }, 1000);
    } else {
      await UseRegister(props.contract);
    }            
  };

  const usehandleClaim = async () => {   
    if(reward === '0.0000000') {
      setWaitingBox(waitingComponent("You do not have any registered nfts"));
      setTimeout(function(){
        setWaitingBox(emptyComponent)
      }, 1000);
    } else {
      await UseClaim(props.contract);
    }                  
  };


  return (
    <div className="cardContainer">
      <div className="cardHeading">
        {props.heading ? props.heading : "Register To Earn"}
        <img src={props.icon ? props.icon : fantomIcon} className="cardLogo" alt="Card Logo"/>
      </div>
      <div className="cardBody">
        <div className="cardDataCntr">
          <div className="dataHeading">{"Total Registered:"}</div>
          <div className="data">{account? registered + '/100' : '0/100'}</div>
        </div>        
        <div className="cardDataCntr">
          <div className="dataHeading" style={{"width":"55%"}}>{"Unclaimed Rewards:"}</div>
          <div className="data" style={{"width":"45%"}}>{account? reward : '0'}</div>
        </div>
        <div className="btnCntr">
          {account? <div className={"btn " + props.className} onClick={usehandleRegister}>{props.registerText ? props.registerText: "Register"}</div> : 
          <div className={"btn " + props.className} style={{pointerEvents: 'none', userSelect: 'none'}}>{props.registerText ? props.registerText: "Register"}</div>}          
          {account? <div className={"btn " + props.className} onClick={usehandleClaim}>{props.claimText ? props.claimText: "Claim"}</div> : 
          <div className={"btn " + props.className} style={{pointerEvents: 'none', userSelect: 'none'}}>{props.claimText ? props.claimText: "Claim"}</div>}
        </div>
      </div>
      {waitingBox}
    </div>
  );
}
