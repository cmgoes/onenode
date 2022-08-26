import NavItem from "./NavItem";
import DashboardIcon from "../assets/DashboardIcon";
import DiamondIcon from "../assets/DiamondIcon";
import MoreIcon from "../assets/MoreIcon";
import FaqIcon from "../assets/FaqIcon";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  return (
    <div className="sidebarContainer">
      <div className="sideBar">
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
      </div>
    </div>
  );
}
