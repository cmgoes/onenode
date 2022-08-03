import {UseRegister, UseClaim, UseMultiplier, UseUnclaimedRewards} from "../hooks/useRegister";
import useMetaMask from "../hooks/useMetamask";

import "../index.css";
import fantomIcon from "../assets/fantom.png";
export default function RegisterNft(props) {
  const { account } = useMetaMask();
  const usehandleRegister = async () => {          
    await UseRegister(props.contract);           
  };

  const usehandleClaim = async () => {          
    await UseClaim(props.contract);            
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
          <div className="data">{account? UseMultiplier(account, props.contract) + '/100' : '0/100'}</div>
        </div>
        <div className="cardDataCntr">
          <div className="dataHeading" style={{"width":"55%"}}>{"Unclaimed Rewards:"}</div>
          <div className="data" style={{"width":"45%"}}>{account? UseUnclaimedRewards(account, props.contract) : '0'}</div>
        </div>
        <div className="btnCntr">
          {account? <div className={"btn " + props.className} onClick={usehandleRegister}>{props.registerText ? props.registerText: "Register"}</div> : 
          <div className={"btn " + props.className} style={{pointerEvents: 'none', userSelect: 'none'}}>{props.registerText ? props.registerText: "Register"}</div>}          
          {account? <div className={"btn " + props.className} onClick={usehandleClaim}>{props.claimText ? props.claimText: "Claim"}</div> : 
          <div className={"btn " + props.className} style={{pointerEvents: 'none', userSelect: 'none'}}>{props.claimText ? props.claimText: "Claim"}</div>}
        </div>
      </div>
    </div>
  );
}
