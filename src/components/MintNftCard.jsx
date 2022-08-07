import {useState} from 'react';
import { ethers, constants } from "ethers";
import {UseMint, UseNFTBalanceOf} from "../hooks/useMint";
import {UseApprove, UseAllowance, UseBalanceOf} from "../hooks/useApprove";
import useMetaMask from "../hooks/useMetamask";
import PumpkinContractAbi from "../constants/abis/pumpkin.json";
import { PumpkinContractAddress } from "../constants/contracts";

import waitingComponent from "./MessageBox/WaitingComponent";
import emptyComponent from "./MessageBox/EmptyComponent";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const PumpkinContract = new ethers.Contract(PumpkinContractAddress, PumpkinContractAbi, provider);

export default function MintNftCard(props) {    
    const { account } = useMetaMask();    
    const [waitingBox, setWaitingBox] = useState(emptyComponent);
    const balance = UseBalanceOf(PumpkinContract, account);
    const nftbalance = UseNFTBalanceOf(props.contract, account);
    const allowance = UseAllowance(PumpkinContract, account, props.mintaddress);
    const usehandleApprove = async () => {                 
        await UseApprove(PumpkinContract, props.mintaddress, constants.MaxUint256);             
    };
    const usehandleMint = async () => {   
        if(balance < props.mintprice) {
            setWaitingBox(waitingComponent("Insufficient Pumpkin!"));
            setTimeout(function(){
                setWaitingBox(emptyComponent)
            }, 1000);
        } else if(nftbalance === '1' && props.mintprice === 20) {
            setWaitingBox(waitingComponent("Already minted one no more mint!"));
            setTimeout(function(){
                setWaitingBox(emptyComponent)
            }, 1000);
        } else {
            await UseMint(props.contract, account, 1, props.mintprice);
        }             
    };
    return (
        <div className="cardContainer nftCard">
            <div className={"nftCardImg"}>
                <img src={props.image} alt="NFT"/>
            </div>
            <div className="nftCardHeader">{props.description}</div>
            <div className="nftCardBody">
                <div className="dataItem">
                    <div className="dataItemHeader">Mint Price:</div>
                    <div className="dataItemVal">{props.price}</div>
                </div>
                {waitingBox}
                <div className="dataItem">
                    <div className="dataItemHeader">Minted:</div>
                    {!props.upcoming? <div className="dataItemVal">{nftbalance}</div> :                     
                    <div className="dataItemVal"></div>}
                </div>                
                {!allowance > 0 ? 
                    <div className={"btn fantom"} style={{borderRadius: "5px", "display":"flex", justifyContent: "center"}} onClick={usehandleApprove}>
                        Approve
                    </div> : props.upcoming ? <div className={"btn fantom"} style={{borderRadius: "5px", "display":"flex", justifyContent: "center", pointerEvents: 'none'}}>
                        Mint
                    </div> : <div className={"btn fantom"} onClick={usehandleMint} style={{borderRadius: "5px", "display":"flex", justifyContent: "center"}}>
                        Mint
                    </div>                    
                } 
            </div>
        </div>
    );
}