import { constants } from "ethers";
import {useState} from 'react';
import {UseApprove, UseAllowance} from "../hooks/useApprove";
import {UseStake, UseUnStake, UseClaim, UseCalculateReward} from "../hooks/useStake";

import useMetaMask from "../hooks/useMetamask";

export default function StakeNftCard(props) {  
  const { account } = useMetaMask();
  const [inputValue, setInputValue] = useState(0);
  const usehandleApprove = async () => {          
    await UseApprove(props.approve, props.stakeaddress, constants.MaxUint256);             
  };

  const usehandleStake = async () => {          
    await UseStake(props.stake, (inputValue*10**18).toString());            
  };

  const usehandleUnstake = async () => {          
    await UseUnStake(props.stake); 
  };

  const usehandleClaim = async () => {          
    await UseClaim(props.stake); 
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
          <div className="dataItemVal">WETH</div>
        </div>
        <div className="dataItem">
          <div className="dataItemHeader">Locking Period:</div>
          <div className="dataItemVal">{props.lockingperiod}</div>
        </div>
        <div className="dataItem">
          <div className="dataItemHeader">APR:</div>
          <div className="dataItemVal">{props.apy}</div>
        </div>
        <div className="claimRewardsCntr">
          <div className="claimRewardsData">
            <div className="claimRewardsHeader">WETH Earned</div>
            <div className="claimRewardsValue">{UseCalculateReward(props.stake, account)}</div>
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
          [account? [inputValue > 0? <div className="btn claim" onClick={usehandleStake}>Stake</div> : <div className="btn claim">Stake</div>] : <div className="btn claim">Stake</div>] : 
          [account? <div className="btn claim" onClick={usehandleApprove}>Approve</div> : <div className="btn claim">Approve</div>]}            
          {account? <div className="btn claim" onClick={usehandleUnstake}>Unstake</div> : <div className="btn claim">Unstake</div>}
        </div>
      </div>
    </div>
  );
}
