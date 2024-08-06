import {
    SendTransactionRequest,
    useIsConnectionRestored,
    useTonConnectModal,
    useTonConnectUI,
    useTonWallet
} from "@tonconnect/ui-react";
import {Address, beginCell, toNano} from "@ton/core";
import {useState} from "react";

interface SendTxProps {
    friendlyAddress: string | null;
}


export const SendTx = ({ friendlyAddress }: SendTxProps) => {
    console.log('Received friendlyAddress:', friendlyAddress); // Add this line for debugging

    const wallet = useTonWallet();
    const isRestored = useIsConnectionRestored();
    useTonConnectModal();
    const [tonConnectUi] = useTonConnectUI();
    const [, setTxInProgress] = useState(false);

    const onSendMint8 = async () => {
        if (!wallet) {
            console.error('Wallet is not connected');
            return;
        }
        
        if (!friendlyAddress) {
            console.error('Friendly address is not available');
            return;
        }
    
        setTxInProgress(true);
    
        try {
            const ownerAddress = Address.parse(friendlyAddress);
    
            const payloadCell = beginCell()
                .storeUint(1, 32)
                .storeUint(123, 64)
                // .storeUint(parseInt(itemIndex), 64)
                .storeCoins(toNano(0.05))
                .storeRef(beginCell()
                    .storeAddress(ownerAddress)
                    .storeRef(
                        beginCell().storeStringTail('JettonVote8.json').endCell()
                    )
                    .storeAddress(ownerAddress)
                    .endCell()
                )
                .endCell();
    
            const payload = payloadCell.toBoc().toString('base64');
    
            const tx: SendTransactionRequest = {
                validUntil: Math.round(Date.now() / 1000) + 60 * 5,
                messages: [
                    {
                        address: "EQBrjR3dqE8dfzhdrIRoBgF_c-CjQje4-_kKSLya9Ea-RsiH",
                        amount: '55000000',
                        payload                 
                    },
                    {
                        address: "0QCsMm47egxSofgw5Y-l34ZeMw6vPYUUyTIjYT3HTafpmH9O",
                        amount: '80000000',                 
                    }
                ]
            };
    
            const result = await tonConnectUi.sendTransaction(tx, {
                modals: 'all',
                notifications: ['error']
            });
    
            console.log('Transaction sent successfully:', result);
            // Optionally handle any other logic here
    
        } catch (e) {
            console.error('Error sending transaction:', e);
        } finally {
            setTxInProgress(false);
        }
    };

    const onSendMint88 = async () => {
        if (!wallet) {
            console.error('Wallet is not connected');
            return;
        }
        
        if (!friendlyAddress) {
            console.error('Friendly address is not available');
            return;
        }
    
        setTxInProgress(true);
    
        try {
            const ownerAddress = Address.parse(friendlyAddress);
    
            const payloadCell = beginCell()
                .storeUint(1, 32)
                .storeUint(123, 64)
                // .storeUint(parseInt(itemIndex), 64)
                .storeCoins(toNano(0.05))
                .storeRef(beginCell()
                    .storeAddress(ownerAddress)
                    .storeRef(
                        beginCell().storeStringTail('JettonVote88.json').endCell()
                    )
                    .storeAddress(ownerAddress)
                    .endCell()
                )
                .endCell();
    
            const payload = payloadCell.toBoc().toString('base64');
    
            const tx: SendTransactionRequest = {
                validUntil: Math.round(Date.now() / 1000) + 60 * 5,
                messages: [
                    {
                        address: "EQBrjR3dqE8dfzhdrIRoBgF_c-CjQje4-_kKSLya9Ea-RsiH",
                        amount: '55000000',
                        payload                 
                    },
                    {
                        address: "0QCsMm47egxSofgw5Y-l34ZeMw6vPYUUyTIjYT3HTafpmH9O",
                        amount: '80000000',                 
                    }
                ]
            };
    
            const result = await tonConnectUi.sendTransaction(tx, {
                modals: 'all',
                notifications: ['error']
            });
    
            console.log('Transaction sent successfully:', result);
            // Optionally handle any other logic here
    
        } catch (e) {
            console.error('Error sending transaction:', e);
        } finally {
            setTxInProgress(false);
        }
    };


    if (!isRestored) {
        return 'Loading...';
    }

    if (!wallet) {
        return;
    }

    return (
        <>
            <button className="mint-button" onClick={onSendMint8}> Mint 8 Vote </button>
            <button className="mint-button-2" onClick={onSendMint88}> Mint 88 Vote </button>
        </>   
    )
}
