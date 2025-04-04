import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Stack,
    styled,
    CircularProgress
} from '@mui/material';
import { ethers } from 'ethers';
import WalletModal from './WalletModal';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 3),
}));

const NavButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: 'transparent',
    },
}));

const Header: React.FC = () => {
    const [account, setAccount] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 监听钱包账户变化
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', () => window.location.reload());
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        };
    });

    // 处理账户变化
    const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
            // 用户断开了钱包
            setAccount('');
            setIsModalOpen(false);
        } else if (accounts[0] !== account) {
            // 更新新的账户
            setAccount(accounts[0]);
        }
    };

    const handleConnectWallet = async () => {
        if (account) {
            setIsModalOpen(true);
            return;
        }

        try {
            setLoading(true);

            if (!window.ethereum) {
                alert('Please install MetaMask first!');
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);

            // 请求连接钱包
            const accounts = await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();

            // 准备签名消息
            const message = "Welcome to Horizon! Please sign this message to verify your identity.";

            try {
                // 请求签名
                const signature = await signer.signMessage(message);
                console.log('Signature:', signature);

                // 验证签名
                const recoveredAddress = ethers.verifyMessage(message, signature);
                const signerAddress = await signer.getAddress();

                if (recoveredAddress.toLowerCase() === signerAddress.toLowerCase()) {
                    setAccount(accounts[0]);
                    console.log('Wallet connected and verified:', accounts[0]);
                } else {
                    throw new Error('Signature verification failed');
                }
            } catch (error) {
                console.error('Signature error:', error);
                alert('Failed to verify signature');
                return;
            }
        } catch (error) {
            console.error('Connection error:', error);
            alert('Failed to connect wallet');
        } finally {
            setLoading(false);
        }
    };

    const handleDisconnectWallet = () => {
        // 只需清除本地状态
        setAccount('');
        setIsModalOpen(false);
    };

    const formatAddress = (address: string) => {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    return (
        <>
            <AppBar position="fixed" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(8px)' }}>
                <StyledToolbar>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        Horizon
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <NavButton>Demos</NavButton>
                        <NavButton>Components</NavButton>
                        <NavButton>Docs</NavButton>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                borderRadius: 2,
                                minWidth: '140px',
                                position: 'relative'
                            }}
                            onClick={handleConnectWallet}
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : account ? (
                                formatAddress(account)
                            ) : (
                                'Connect Wallet'
                            )}
                        </Button>
                    </Stack>
                </StyledToolbar>
            </AppBar>

            <WalletModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                account={account}
                onDisconnect={handleDisconnectWallet}
            />
        </>
    );
};

export default Header; 