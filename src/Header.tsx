import { useState, useEffect, useRef } from 'react';
import { useTonConnectModal, useTonConnectUI, useTonWallet, CHAIN, toUserFriendlyAddress } from "@tonconnect/ui-react";
import './App.css';

interface HeaderProps {
    setWalletAddress: (address: string | null) => void;
}

export const Header = ({ setWalletAddress }: HeaderProps) => {
    const wallet = useTonWallet();
    const { open } = useTonConnectModal();
    const [tonConnectUi] = useTonConnectUI();
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [walletImageUrl, setWalletImageUrl] = useState<string | null>(null);
    const [walletAddress, setWalletAddressLocal] = useState<string | null>(null);
    const [showMenu, setShowMenu] = useState(false);
    const [copyButtonText, setCopyButtonText] = useState('Copy Address');

    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (wallet) {
            setIsWalletConnected(true);
            if ('imageUrl' in wallet) {
                setWalletImageUrl(wallet.imageUrl);
            }
            const address = wallet.account?.address;
            if (address) {
                const friendly = toUserFriendlyAddress(address, wallet.account.chain === CHAIN.TESTNET);
                setWalletAddressLocal(friendly);
                setWalletAddress(friendly); // Update wallet address in App component
            } else {
                setWalletAddressLocal(null);
                setWalletAddress(null);
            }
        } else {
            setIsWalletConnected(false);
            setWalletImageUrl(null);
            setWalletAddressLocal(null);
            setWalletAddress(null);
        }
    }, [wallet, setWalletAddress]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) && !buttonRef.current?.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDisconnect = async () => {
        try {
            await tonConnectUi.disconnect();
            setIsWalletConnected(false);
            setWalletImageUrl(null);
            setWalletAddressLocal(null);
            setWalletAddress(null);
        } catch (error) {
            console.error('Error disconnecting wallet:', error);
        }
    };

    const handleOpenModal = () => {
        if (!isWalletConnected) {
            open();
        }
    };

    const handleCopyAddress = () => {
        if (walletAddress) {
            navigator.clipboard.writeText(walletAddress);
            setCopyButtonText('Copied!');
            setTimeout(() => {
                setCopyButtonText('Copy Address');
            }, 2000);
        }
    };

    const truncateAddress = (address: string) => {
        if (address.length <= 8) return address;
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            padding: '10px',
            zIndex: 1000
        }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <button
                    ref={buttonRef}
                    onClick={handleOpenModal}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'linear-gradient(45deg, #4CAF50, #2C6B2F)', // Gradient from green to dark green
                        border: '2px solid white',
                        borderRadius: '20px',
                        color: 'white',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        position: 'relative',
                        outline: 'none', // Remove blue outline
                        boxShadow: 'none' // Remove box shadow on focus
                    }}
                >
                    {walletAddress ? (
                        <div onClick={() => setShowMenu(!showMenu)} style={{ display: 'flex', alignItems: 'center' }}>
                            {walletImageUrl && (
                                <img
                                    src={walletImageUrl}
                                    height="35px"
                                    width="35px"
                                    style={{ borderRadius: '50%', marginRight: '10px' }}
                                    alt="Wallet"
                                />
                            )}
                            <strong>{truncateAddress(walletAddress)}</strong>
                        </div>
                    ) : (
                        'Connect Wallet'
                    )}
                </button>
                {showMenu && walletAddress && (
                    <div ref={menuRef} style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'linear-gradient(45deg, #2C6B2F, #4CAF50)', // Gradient from dark green to green
                        borderRadius: '20px',
                        border: '2px solid white',
                        boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
                        padding: '10px',
                        zIndex: 1000,
                        width: buttonRef.current ? `${buttonRef.current.offsetWidth * 0.8}px` : 'auto',
                        opacity: showMenu ? 1 : 0,
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                    }}>
                        <button
                            onClick={handleCopyAddress}
                            style={{
                                display: 'block',
                                width: '100%',
                                background: 'transparent',
                                border: 'none',
                                padding: '5px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                fontSize: '16px',
                                color: 'white',
                                fontWeight: 'bold',
                                borderRadius: '5px',
                                transition: 'background 0.3s',
                                marginBottom: '5px',
                                outline: 'none', // Remove blue outline
                                boxShadow: 'none' // Remove box shadow on focus
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#388E3C')} // Darker green on hover
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                            {copyButtonText}
                        </button>
                        <button
                            onClick={handleDisconnect}
                            style={{
                                display: 'block',
                                width: '100%',
                                background: 'transparent',
                                border: 'none',
                                padding: '5px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                fontSize: '16px',
                                color: 'white',
                                fontWeight: 'bold',
                                borderRadius: '5px',
                                transition: 'background 0.3s',
                                marginBottom: '5px',
                                outline: 'none', // Remove blue outline
                                boxShadow: 'none' // Remove box shadow on focus
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#388E3C')} // Darker green on hover
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                            Disconnect
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
