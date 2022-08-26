import {useState} from 'react';
import {UseMint, UseNFTBalanceOf} from "../hooks/useMint";
import {UseApprove, UseAllowance, UseBalanceOf} from "../hooks/useApprove";
import { useWeb3Context } from "../hooks";
import { PumpkinContractAddress } from "../constants/contracts";
import { useAddress } from "../hooks/web3-context";

import waitingComponent from "./MessageBox/WaitingComponent";
import emptyComponent from "./MessageBox/EmptyComponent";

interface Props {
    image: string,
    price: string,
    description: string,
    mintprice: number,
    contract: string,
    upcoming: boolean,
}

export default function MintNftCard({ image, price, description, mintprice, contract, upcoming } : Props) { 
    const { provider } = useWeb3Context(); 
    const address =useAddress(); 
    const token = PumpkinContractAddress;
    const spender = contract;   
    const [waitingBox, setWaitingBox] = useState(emptyComponent);
    const balance = UseBalanceOf({ token, provider, address });
    const nftbalance = UseNFTBalanceOf({ spender, provider, address });
    const allowance = UseAllowance({ token, provider, address, spender });    

    const usehandleApprove = async () => {                 
        await UseApprove({ token, provider, spender });             
    };

    const usehandleMint = async () => {   
        if(balance < mintprice) {
            setWaitingBox(waitingComponent("Insufficient Pumpkin!"));
            setTimeout(function(){
                setWaitingBox(emptyComponent)
            }, 1000);
        } else if(nftbalance === '1' && mintprice === 20) {
            setWaitingBox(waitingComponent("Already minted one no more mint!"));
            setTimeout(function(){
                setWaitingBox(emptyComponent)
            }, 1000);
        } else {
            await UseMint({ spender, provider,  address, mintprice });
        }             
    };
    return (
        <div className="cardContainer nftCard">
            <div className={"nftCardImg"}>
                <img src={image} alt="NFT"/>
            </div>
            <div className="nftCardHeader">{description}</div>
            <div className="nftCardBody">
                <div className="dataItem">
                    <div className="dataItemHeader">Mint Price:</div>
                    <div className="dataItemVal">{price}</div>
                </div>
                {waitingBox}
                <div className="dataItem">
                    <div className="dataItemHeader">Minted:</div>
                    {!upcoming? <div className="dataItemVal">{nftbalance}</div> :                     
                    <div className="dataItemVal"></div>}
                </div>                
                {allowance <= 0 ? 
                    <div className={"btn fantom"} style={{borderRadius: "5px", "display":"flex", justifyContent: "center"}} onClick={usehandleApprove}>
                        Approve
                    </div> : upcoming ? <div className={"btn fantom"} style={{borderRadius: "5px", "display":"flex", justifyContent: "center", pointerEvents: 'none'}}>
                        Mint
                    </div> : <div className={"btn fantom"} onClick={usehandleMint} style={{borderRadius: "5px", "display":"flex", justifyContent: "center"}}>
                        Mint
                    </div>                    
                } 
            </div>
        </div>
    );
}