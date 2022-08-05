import NavItem from "./NavItem";
import DashboardIcon from "../assets/DashboardIcon.jsx";
import DiamondIcon from "../assets/DiamondIcon.jsx";
import MoreIcon from "../assets/MoreIcon.jsx";
import FaqIcon from "../assets/FaqIcon.jsx";
import { useLocation } from "react-router-dom";

export default function Sidebar(props) {
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
