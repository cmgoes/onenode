import { useEffect, useState } from "react";
import { useWeb3Context } from "../hooks";
import { DEFAULD_NETWORK } from "../constants/blockchain";
import { Button, Box } from "@mui/material";
// import "./connect-menu.scss";

function ConnectButton() {
    const { connect, disconnect, address, connected, web3, providerChainID, checkWrongNetwork } = useWeb3Context();    
    const [isConnected, setConnected] = useState(connected);    

    let buttonText = "Connect Wallet";
    let clickFunc: any = connect;
    let buttonStyle = {cursor: 'pointer', backgroundColor: '#f5ac39', borderRadius: '1rem', 
    padding: '10px 20px', color: 'white', width: '180px'};

    if (isConnected) {
        buttonText = "Disconnect";
        clickFunc = disconnect;
    }    

    if (isConnected && providerChainID !== DEFAULD_NETWORK) {
        buttonText = "Wrong network";
        // buttonStyle = { backgroundColor: "rgb(255, 67, 67)" };
        clickFunc = () => {
            checkWrongNetwork();
        };
    }

    useEffect(() => {
        setConnected(connected);
    }, [web3, connected]);

    return (
        // <div className="connect-button" style={buttonStyle} onClick={clickFunc}>
        //     <p>{buttonText}</p>            
        // </div>
        <Box>
        {address ? (
          <Box display="flex" alignItems="center" gap="8px">
            <Box>
              {address.slice(0, 4)}...{address.slice(-4)}
            </Box>
            <Button variant="contained" onClick={clickFunc}>
              {buttonText}
            </Button>
          </Box>
        ) : (
          <>
          <Button variant="contained" onClick={clickFunc}>
            {buttonText}
          </Button>
          </>
        )}
      </Box>
    );
}

export default ConnectButton;
