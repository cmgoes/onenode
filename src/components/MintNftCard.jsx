
import {UseMint, UseBalanceOf} from "../hooks/useMint";
import useMetaMask from "../hooks/useMetamask";

export default function MintNftCard(props) {
    const { account } = useMetaMask();
    const usehandleMint = async () => {          
        await UseMint(props.contract, account, 1);                  
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
                <div className="dataItem">
                    <div className="dataItemHeader">Minted:</div>
                    {account? [!props.upcoming? <div className="dataItemVal">{UseBalanceOf(props.contract, account)}</div> :
                    <div className="dataItemVal"></div>] : 
                    <div className="dataItemVal"></div>}
                </div>
                {account? [!props.upcoming? <div className={"btn fantom"} onClick={usehandleMint} style={{borderRadius: "5px", "display":"flex", justifyContent: "center"}}> Mint </div> :
                <div className={"btn fantom"} style={{borderRadius: "5px", "display":"flex", justifyContent: "center", pointerEvents: 'none'}}> Mint </div>] : 
                <div className={"btn fantom"} style={{borderRadius: "5px", "display":"flex", justifyContent: "center", pointerEvents: 'none'}}> Mint </div>}                
            </div>
        </div>
    );
}