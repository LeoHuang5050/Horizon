import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
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
    const [hasSigned, setHasSigned] = useState<boolean>(false);

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
    const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length === 0) {
            // 用户断开了钱包
            setAccount('');
            setIsModalOpen(false);
            setHasSigned(false);
        } else if (accounts[0] !== account) {
            // 用户切换到新账户
            const newAccount = accounts[0];
            if (!hasSigned) {
                // 如果之前没有签名过，要求重新签名
                await handleConnectWallet(newAccount);
            } else {
                // 如果已经签名过，直接切换账户
                setAccount(newAccount);
            }
        }
    };

    const handleConnectWallet = async (newAccount: string | null = null) => {
        // 如果已连接账户且不是切换账户的场景，则显示模态框
        if (account && !newAccount) {
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
            const currentAccount = newAccount || accounts[0]; // 使用传入的账户或获取新账户
            const signer = await provider.getSigner();
            
            // 准备签名消息
            const message = "Welcome to Horizon! Please sign this message to verify your identity.";

            try {
                // 请求签名
                const signature = await signer.signMessage(message);
                console.log('Signature:', signature);

                // 验证签名
                const recoveredAddress = ethers.verifyMessage(message, signature);
                if (recoveredAddress.toLowerCase() === currentAccount.toLowerCase()) {
                    setAccount(currentAccount);
                    setHasSigned(true);
                    console.log('Wallet connected and verified:', currentAccount);
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
                            onClick={() => handleConnectWallet(account)}
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