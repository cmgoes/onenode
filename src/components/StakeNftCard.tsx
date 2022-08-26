import {useState} from 'react';
import {UseApprove, UseAllowance, UseBalanceOf} from "../hooks/useApprove";
import {UseStake, UseUnStake, UseClaim, UseCalculateReward, UseCalculateStaked} from "../hooks/useStake";
import { useWeb3Context } from "../hooks";
import waitingComponent from "./MessageBox/WaitingComponent";
import emptyComponent from "./MessageBox/EmptyComponent";
import { RewardContractAddress } from "../constants/contracts";
import { useAddress } from "../hooks/web3-context";
import dai from '../assets/dai.png';

// import useMetaMask from "../hooks/useMetamask";

interface IStake {
  lockingperiod: string,
  apy: string,
  stake: string,
}

export default function StakeNftCard({ lockingperiod, apy, stake } : IStake) {  
  const { provider } = useWeb3Context();
  const address =useAddress();    
  const token = RewardContractAddress;
  const spender = stake;   
  const [inputValue, setInputValue] = useState(0);
  const [waitingBox, setWaitingBox] = useState(emptyComponent);
  const usehandleApprove = async () => {          
    await UseApprove({ token, provider, spender });             
  };

  const balance = UseBalanceOf({ token, provider, address });
  const reward = UseCalculateReward({ spender, provider, address });
  const staked = UseCalculateStaked({ spender, provider, address });
  const allowance = UseAllowance({ token, provider, address, spender });

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
      const amount = (inputValue*10**18).toString();
      await UseStake({ spender, provider, amount }); 
    }  

  };

  const usehandleUnstake = async () => {    
    if(reward === 0) {
      setWaitingBox(waitingComponent("You didn't stake yet!"));
      setTimeout(function(){
        setWaitingBox(emptyComponent)
      }, 1000); 
    } else {
      await UseUnStake({ spender, provider });
    } 
  };

  const usehandleClaim = async () => {
    if(reward === 0) {
      setWaitingBox(waitingComponent("You didn't stake yet!"));
      setTimeout(function(){
        setWaitingBox(emptyComponent)
      }, 1000); 
    } else {
      await UseClaim({ spender, provider });
    }   
  };
  
  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(Number(event.target.value));
  }

  return (
    <div className="cardContainer stakeNftCard">
      <div className="stakeCardHeader">        
        <div className="stakingCardText">Stake</div>
        <img src={dai} className="stakingCardImg" alt="Stake Icon"/>
      </div>
      <div className="nftCardBody">
        <div className="dataItem">
          <div className="dataItemHeader">Earn:</div>
          <div className="dataItemVal">DAI</div>
        </div>
        <div className="dataItem">
          <div className="dataItemHeader">Locking Period:</div>
          <div className="dataItemVal">{lockingperiod}</div>
        </div>
        <div className="dataItem">
          <div className="dataItemHeader">APY:</div>
          <div className="dataItemVal">{apy}</div>
        </div>
        <div className="dataItem">
          <div className="dataItemHeader">Staked:</div>
          <div className="dataItemVal">{staked}</div>
        </div>
        <div className="claimRewardsCntr">
          <div className="claimRewardsData">
            <div className="claimRewardsHeader">DAI Earned</div>
            <div className="claimRewardsValue">{reward}</div>
          </div>
          <div className="claimBtnCntr">
          {address? <div className="btn claim" onClick={usehandleClaim}>Claim</div> : <div className="btn claim">Claim</div>}
          </div>
        </div>
        <div className="stakeInputCntr">
          <input className="stakeInput" value={inputValue} onChange={handleInput} placeholder="Enter Amount"></input>
        </div>
        <div className={"stakeBtnCntr"}>
          {allowance > inputValue?           
          <div className="btn claim" onClick={usehandleStake}>Stake</div> :
          [address? <div className="btn claim" onClick={usehandleApprove}>Approve</div> : <div className="btn claim">Approve</div>]}            
          {address? <div className="btn claim" onClick={usehandleUnstake}>Unstake</div> : <div className="btn claim">Unstake</div>}
        </div>
        {waitingBox}
      </div>
    </div>
  );
}
