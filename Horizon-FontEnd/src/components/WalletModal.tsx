import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box,
  IconButton,
  Stack,
  styled,
  alpha,
  Tooltip,
  Fade
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import MetaMaskIcon from '../assets/metamask.svg';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    backdropFilter: 'blur(10px)',
    borderRadius: 20,
    maxWidth: 380,
    width: '100%',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  },
}));

const NetworkButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: '8px 16px',
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
  },
  '&.inactive': {
    backgroundColor: alpha(theme.palette.grey[500], 0.1),
    color: theme.palette.grey[500],
  },
}));

interface WalletModalProps {
  open: boolean;
  onClose: () => void;
  account: string;
  onDisconnect: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({
  open,
  onClose,
  account,
  onDisconnect,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(account);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <StyledDialog 
      open={open} 
      onClose={onClose}
      TransitionComponent={Fade}
      transitionDuration={250}
    >
      <DialogContent sx={{ p: 3 }}>
        <Stack spacing={3}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Manage Wallet
            </Typography>
            <IconButton
              onClick={onClose}
              sx={{
                color: 'text.secondary',
                '&:hover': { backgroundColor: alpha('#000', 0.04) }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          {/* Network Selection */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Select Network
            </Typography>
            <Stack spacing={1.5}>
              <NetworkButton>
                Ethereum
              </NetworkButton>
              <NetworkButton className="inactive">
                BNB Smart Chain
              </NetworkButton>
              <NetworkButton className="inactive">
                Base
              </NetworkButton>
            </Stack>
          </Box>

          {/* Wallet Info */}
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box
                component="img"
                src={MetaMaskIcon}
                alt="MetaMask"
                sx={{ width: 28, height: 28 }}
              />
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                MetaMask
              </Typography>
            </Stack>
            
            <Stack 
              direction="row" 
              alignItems="center" 
              spacing={1}
              sx={{
                backgroundColor: alpha('#000', 0.03),
                borderRadius: 2,
                py: 1.5,
                px: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'monospace',
                  color: 'text.primary',
                  flex: 1,
                  fontSize: '0.9rem',
                  letterSpacing: '0.5px'
                }}
              >
                {formatAddress(account)}
              </Typography>
              <Tooltip 
                title={copied ? "Copied!" : "Copy address"} 
                placement="top"
                arrow
              >
                <IconButton
                  size="small"
                  onClick={handleCopyAddress}
                  sx={{
                    color: copied ? 'success.main' : 'text.secondary',
                    '&:hover': {
                      backgroundColor: alpha('#000', 0.05),
                    }
                  }}
                >
                  {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          {/* Disconnect Button */}
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={onDisconnect}
            sx={{
              borderRadius: 3,
              textTransform: 'none',
              py: 1,
              borderWidth: 1.5,
              '&:hover': {
                borderWidth: 1.5,
                backgroundColor: alpha('#f44336', 0.04)
              }
            }}
          >
            Disconnect Wallet
          </Button>
        </Stack>
      </DialogContent>
    </StyledDialog>
  );
};

export default WalletModal; 