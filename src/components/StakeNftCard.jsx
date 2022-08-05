import { constants } from "ethers";
import {useState} from 'react';
import {UseApprove, UseAllowance, UseBalanceOf} from "../hooks/useApprove";
import {UseStake, UseUnStake, UseClaim, UseCalculateReward, UseCalculateStaked} from "../hooks/useStake";
import waitingComponent from "./MessageBox/WaitingComponent";
import emptyComponent from "./MessageBox/EmptyComponent";

import useMetaMask from "../hooks/useMetamask";


export default function StakeNftCard(props) {  
  const { account } = useMetaMask();
  const [inputValue, setInputValue] = useState(0);
  const [waitingBox, setWaitingBox] = useState(emptyComponent);
  const usehandleApprove = async () => {          
    await UseApprove(props.approve, props.stakeaddress, constants.MaxUint256);             
  };

  const balance = UseBalanceOf(props.approve, account);
  const reward = UseCalculateReward(props.stake, account);

  const usehandleStake = async () => {      
    if(inputValue === 0) {
      setWaitingBox(waitingComponent("Input should be bigger than 0 !"));
      setTimeout(function(){
        setWaitingBox(emptyComponent)
      }, 1000);
    } else if (inputValue > balance) {  
      setWaitingBox(waitingComponent("Insufficient amount!"));
      setTimeout(function(){
        setWaitingBox(emptyComponent)
      }, 1000); 
    } 
    else {
      await UseStake(props.stake, (inputValue*10**18).toString()); 
    }  

  };

  const usehandleUnstake = async () => {    
    if(reward === 0) {
      setWaitingBox(waitingComponent("You didn't stake yet!"));
      setTimeout(function(){
        setWaitingBox(emptyComponent)
      }, 1000); 
    } else {
      await UseUnStake(props.stake);
    } 
  };

  const usehandleClaim = async () => {
    if(reward === '0') {
      setWaitingBox(waitingComponent("You didn't stake yet!"));
      setTimeout(function(){
        setWaitingBox(emptyComponent)
      }, 1000); 
    } else {
      await UseClaim(props.stake);
    }   
  };
  
  function handleInput(event) {
    setInputValue(event.target.value);
  }

  return (
    <div className="cardContainer stakeNftCard">
      <div className="stakeCardHeader">        
        <div className="stakingCardText">Stake</div>
        <img src={props.icon} className="stakingCardImg" alt="Stake Icon"/>
      </div>
      <div className="nftCardBody">
        <div className="dataItem">
          <div className="dataItemHeader">Earn:</div>
          <div className="dataItemVal">DAI</div>
        </div>
        <div className="dataItem">
          <div className="dataItemHeader">Locking Period:</div>
          <div className="dataItemVal">{props.lockingperiod}</div>
        </div>
        <div className="dataItem">
          <div className="dataItemHeader">APY:</div>
          <div className="dataItemVal">{props.apy}</div>
        </div>
        <div className="dataItem">
          <div className="dataItemHeader">Staked:</div>
          <div className="dataItemVal">{UseCalculateStaked(props.stake, account)}</div>
        </div>
        <div className="claimRewardsCntr">
          <div className="claimRewardsData">
            <div className="claimRewardsHeader">DAI Earned</div>
            <div className="claimRewardsValue">{reward}</div>
          </div>
          <div className="claimBtnCntr">
          {account? <div className="btn claim" onClick={usehandleClaim}>Claim</div> : <div className="btn claim">Claim</div>}
          </div>
        </div>
        <div className="stakeInputCntr">
          <input className="stakeInput" value={inputValue} onChange={handleInput} placeholder="Enter Amount"></input>
        </div>
        <div className={"stakeBtnCntr"}>
          {UseAllowance(props.approve, account, props.stakeaddress) > inputValue?           
          <div className="btn claim" onClick={usehandleStake}>Stake</div> :
          [account? <div className="btn claim" onClick={usehandleApprove}>Approve</div> : <div className="btn claim">Approve</div>]}            
          {account? <div className="btn claim" onClick={usehandleUnstake}>Unstake</div> : <div className="btn claim">Unstake</div>}
        </div>
        {waitingBox}
      </div>
    </div>
  );
}
