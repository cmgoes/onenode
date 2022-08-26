import { KeyContractAddress } from "../constants/contracts";
import { LootBoxContractAddress } from "../constants/contracts";
import MintNftCard from "./MintNftCard";
import "../index.css";
import GoldImage from '../assets/gold.gif';
import KeyImage from "../assets/key.gif";
import LootboxImage from "../assets/lootbox.gif";

export default function Mint() {
  const data = [
    {
        image: `${GoldImage}`,
        price: "3000 pumpkins",
        description: "COMING SOON",        
        mintprice: 3000,
        contract: KeyContractAddress,
        upcoming: true
    },
    {
        image: `${KeyImage}`,
        price: "20 pumpkins",
        description: "Gain access to pumpkins first stable token genesis pools",        
        mintprice: 20,
        contract: KeyContractAddress,
        upcoming: false
    },
    {
        image: `${LootboxImage}`,
        price: "10 pumpkins",
        description: "Random loot box that could contain : USDC , TOMB , PUMPKIN , 1% NODES , RUGGED CLOWNS NFT , SECRET KEY",        
        mintprice: 10,
        contract: LootBoxContractAddress,
        upcoming: false
    }
  ];

  const mintNFTList = data.map((index) => {
    return (
      <MintNftCard 
        image={index.image} 
        price={index.price} 
        description={index.description} 
        mintprice={index.mintprice}         
        contract={index.contract}         
        upcoming={index.upcoming}
      />
    )
  })

  return (
    <div className="flex flex-col container lg:px-10 h-[100%]">
      <div className="registerNftCntr">
        {mintNFTList}
      </div>
    </div>
  );
}
