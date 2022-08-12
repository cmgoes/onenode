import Web3Modal from 'web3modal';
import useMetaMask from "../../hooks/useMetamask";
import WalletConnectProvider from '@walletconnect/web3-provider'
import { Button, Box } from "@mui/material";

const Web3Status = () => {
  const { account, activate, deactivate } = useMetaMask();
  
  const activateProvider = async () => {
    const providerOptions = {
      injected: {
        display: {
          name: 'Metamask',
          description: 'Connect with the provider in your Browser',
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          bridge: 'https://bridge.walletconnect.org',
          infuraId: 'd8df2cb7844e4a54ab0a782f608749dd',
        },
      },
    }

    const web3Modal = new Web3Modal({
      providerOptions,
    })
    try {
      const provider = await web3Modal.connect();
      await activate(provider)
      
    } catch (error) {      
    }
  }

  return (
    <Box>
      {account ? (
        <Box display="flex" alignItems="center" gap="8px">
          <Box>
            {account.slice(0, 4)}...{account.slice(-4)}
          </Box>
          <Button variant="contained" onClick={deactivate}>
            Disconnect
          </Button>
        </Box>
      ) : (
        <>
        <Button variant="contained" onClick={activateProvider}>
          Connect
        </Button>
        </>
      )}
    </Box>
  );
};

export default Web3Status;
