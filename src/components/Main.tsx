import DashboardIcon from '../assets/DashboardIcon';
import DiamondIcon from "../assets/DiamondIcon";
import MoreIcon from "../assets/MoreIcon";
import FaqIcon from "../assets/FaqIcon";
import NavItem from "./NavItem";
import Dashboard from "./Dashboard";
import Mint from "./Mint";
import Stake from "./Stake";
import Sidebar from './Sidebar';

import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface Props {
  openSidebar: boolean,
}

export default function Navigator({ openSidebar } : Props) {
  const location = useLocation();
  return (
    <main className="relative flex flex-1 items-start pt-10 pb-10 lg:px-5 lg:pt-8 lg:pb-0 justify-center ">
      <nav className="hidden py-7 w-64 text-base bg-white rounded-2xl shadow-md lg:block">
        <ul className="list-none">
          <NavItem
            IconElement={DashboardIcon}
            text="Dashboard"
            classname={location.pathname === "/" ? "active" : ""}
            redirectLink={"/"}
          />
          <NavItem
            IconElement={DiamondIcon}
            text="Mint Nfts"
            classname={location.pathname === "/mint" ? "active" : ""}
            redirectLink={"/mint"}
          />
          <NavItem
            IconElement={FaqIcon}
            text="Stake"
            classname={location.pathname === "/stake" ? "active" : ""}
            redirectLink={"/stake"}
          />
          <NavItem
            IconElement={MoreIcon}
            text="Home"
            // classname={"active"}
            classname={location.pathname === "/" ? "active" : ""}
            redirectLink={"https://www.1out100.com/"}
          />            
        </ul>
      </nav>
      {openSidebar === true && <Sidebar />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="mint" element={<Mint />} />
        <Route path="stake" element={<Stake />} />
      </Routes>
    </main>
  );
}
