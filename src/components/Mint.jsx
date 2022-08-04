import { ethers } from "ethers";
import MKSContractAbi from "../constants/abis/mks.json";
import { KeyContractAddress } from "../constants/contracts";
import { LootBoxContractAddress } from "../constants/contracts";

import MintNftCard from "./MintNftCard";
import "../index.css";
import GoldImage from "../assets/gold.gif";
import KeyImage from "../assets/key.gif";
import LootboxImage from "../assets/lootbox.gif";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const KeyContract = new ethers.Contract(KeyContractAddress, MKSContractAbi, provider);
const LootBoxContract = new ethers.Contract(LootBoxContractAddress, MKSContractAbi, provider);

export default function Mint(props) {
  const data = [
    {
        "Image": `${GoldImage}`,
        "price": "3000 pumpkins",
        "description": "COMING SOON",
        contract: KeyContract,
        upcoming: true
    },
    {
        "Image": `${KeyImage}`,
        "price": "20 pumpkins",
        "description": "Gain access to fantoms first stable token genesis pools",
        contract: KeyContract,
        upcoming: false
    },
    {
        "Image": `${LootboxImage}`,
        "price": "10 pumpkins",
        "description": "Random loot box that could contain : USDC , TOMB , PUMPKIN , 1% NODES , RUGGED CLOWNS NFT , SECRET KEY",
        contract: LootBoxContract,
        upcoming: false
    }
  ];

  const mintNFTList = data.map((index) => {
    return (
      <MintNftCard image={index.Image} price={index.price} description={index.description} contract={index.contract} upcoming={index.upcoming}/>
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
