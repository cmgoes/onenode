import useMetaMask from "../../hooks/useMetamask";
import { Button, Box } from "@mui/material";

const Web3Status = () => {
  const { account, activateBrowserWallet, deactivate } = useMetaMask();

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
        <Button variant="contained" onClick={activateBrowserWallet}>
          Connect
        </Button>
      )}
    </Box>
  );
};

export default Web3Status;
