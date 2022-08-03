import MintNftCard from "./MintNftCard";
import "../index.css";
import GoldImage from "../assets/gold.gif";
import KeyImage from "../assets/key.gif";
import LootboxImage from "../assets/lootbox.gif";

export default function Mint(props) {
  const data = [
    {
        "Image": `${GoldImage}`,
        "price": "3000 pumpkins",
        "description": "COMING SOON"
    },
    {
        "Image": `${KeyImage}`,
        "price": "20 pumpkins",
        "description": "Gain access to fantoms first stable token genesis pools"
    },
    {
        "Image": `${LootboxImage}`,
        "price": "10 pumpkins",
        "description": "Random loot box that could contain : USDC , TOMB , PUMPKIN , 1% NODES , RUGGED CLOWNS NFT , SECRET KEY"
    }
  ];

  const mintNFTList = data.map((index) => {
    return (
      <MintNftCard image={index.Image} price={index.price} description={index.description}/>
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
