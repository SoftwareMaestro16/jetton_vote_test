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

    // const onSendMint8 = async () => {
    //     if (!wallet) {
    //         console.error('Wallet is not connected');
    //         return;
    //     }
        
    //     if (!friendlyAddress) {
    //         console.error('Friendly address is not available');
    //         return;
    //     }
    
    //     setTxInProgress(true);
    
    //     try {
    //         const ownerAddress = Address.parse(friendlyAddress);
    
    //         const payloadCell = beginCell()
    //             .storeUint(1, 32)
    //             .storeUint(123, 64)
    //             // .storeUint(parseInt(itemIndex), 64)
    //             .storeCoins(toNano(0.05))
    //             .storeRef(beginCell()
    //                 .storeAddress(ownerAddress)
    //                 .storeRef(
    //                     beginCell().storeStringTail('JettonVote8.json').endCell()
    //                 )
    //                 .storeAddress(ownerAddress)
    //                 .endCell()
    //             )
    //             .endCell();
    
    //         const payload = payloadCell.toBoc().toString('base64');
    
    //         const tx: SendTransactionRequest = {
    //             validUntil: Math.round(Date.now() / 1000) + 60 * 5,
    //             messages: [
    //                 {
    //                     address: "EQBrjR3dqE8dfzhdrIRoBgF_c-CjQje4-_kKSLya9Ea-RsiH",
    //                     amount: '55000000',
    //                     payload                 
    //                 },
    //                 {
    //                     address: "0QCsMm47egxSofgw5Y-l34ZeMw6vPYUUyTIjYT3HTafpmH9O",
    //                     amount: '80000000',                 
    //                 }
    //             ]
    //         };
    
    //         const result = await tonConnectUi.sendTransaction(tx, {
    //             modals: 'all',
    //             notifications: ['error']
    //         });
    
    //         console.log('Transaction sent successfully:', result);
    //         // Optionally handle any other logic here
    
    //     } catch (e) {
    //         console.error('Error sending transaction:', e);
    //     } finally {
    //         setTxInProgress(false);
    //     }
    // };

    // const onSendMint88 = async () => {
    //     if (!wallet) {
    //         console.error('Wallet is not connected');
    //         return;
    //     }
        
    //     if (!friendlyAddress) {
    //         console.error('Friendly address is not available');
    //         return;
    //     }
    
    //     setTxInProgress(true);
    
    //     try {
    //         const ownerAddress = Address.parse(friendlyAddress);
    
    //         const payloadCell = beginCell()
    //             .storeUint(1, 32)
    //             .storeUint(123, 64)
    //             // .storeUint(parseInt(itemIndex), 64)
    //             .storeCoins(toNano(0.05))
    //             .storeRef(beginCell()
    //                 .storeAddress(ownerAddress)
    //                 .storeRef(
    //                     beginCell().storeStringTail('JettonVote88.json').endCell()
    //                 )
    //                 .storeAddress(ownerAddress)
    //                 .endCell()
    //             )
    //             .endCell();
    
    //         const payload = payloadCell.toBoc().toString('base64');
    
    //         const tx: SendTransactionRequest = {
    //             validUntil: Math.round(Date.now() / 1000) + 60 * 5,
    //             messages: [
    //                 {
    //                     address: "EQBrjR3dqE8dfzhdrIRoBgF_c-CjQje4-_kKSLya9Ea-RsiH",
    //                     amount: '55000000',
    //                     payload                 
    //                 },
    //                 {
    //                     address: "0QCsMm47egxSofgw5Y-l34ZeMw6vPYUUyTIjYT3HTafpmH9O",
    //                     amount: '80000000',                 
    //                 }
    //             ]
    //         };
    
    //         const result = await tonConnectUi.sendTransaction(tx, {
    //             modals: 'all',
    //             notifications: ['error']
    //         });
    
    //         console.log('Transaction sent successfully:', result);
    //         // Optionally handle any other logic here
    
    //     } catch (e) {
    //         console.error('Error sending transaction:', e);
    //     } finally {
    //         setTxInProgress(false);
    //     }
    // };

    // const encodeRoyaltyParams = (params: { royaltyFactor: number, royaltyBase: number, royaltyAddress: Address }): Cell => {
    //     return beginCell()
    //         .storeUint(params.royaltyFactor, 16)
    //         .storeUint(params.royaltyBase, 16)
    //         .storeAddress(params.royaltyAddress)
    //         .endCell();
    // };

    // const onSendMintCollection = async () => {
    //     if (!wallet) {
    //         console.error('Wallet is not connected');
    //         return;
    //     }
    
    //     setTxInProgress(true);
    
    //     try {
    //         const ownerAddress = Address.parse("0QCsMm47egxSofgw5Y-l34ZeMw6vPYUUyTIjYT3HTafpmH9O");
    //         const royaltyAddress = ownerAddress;
            
    //         const royaltyParams = {
    //             royaltyFactor: 0,
    //             royaltyBase: 1100,
    //             royaltyAddress: royaltyAddress
    //         };
    
    //         const royaltyParamsCell = encodeRoyaltyParams(royaltyParams);
    
    //         const commonContent2 = beginCell()
    //             .storeStringTail("")
    //             .endCell();

    //         const commonContent1 = beginCell()
    //             .storeUint(1, 8) 
    //             .storeStringTail("https://softwaremaestro16.github.io/nft_collection/folder_for_jetton_vote/JettonVoteCollection.json")
    //             .endCell();

    //         const collectionContent = beginCell()
    //             .storeUint(1, 8) 
    //             .storeRef(commonContent1)
    //             .storeRef(commonContent2)
    //             .endCell();

    //         const collectionData = beginCell()
    //             .storeAddress(ownerAddress)
    //             .storeUint(0, 64) 
    //             .storeRef(collectionContent) 
    //             .storeRef(Cell.fromBase64("te6ccgECDQEAAdAAART/APSkE/S88sgLAQIBYgIDAgLOBAUACaEfn+AFAgEgBgcCASALDALXDIhxwCSXwPg0NMDAXGwkl8D4PpA+kAx+gAxcdch+gAx+gAw8AIEs44UMGwiNFIyxwXy4ZUB+kDUMBAj8APgBtMf0z+CEF/MPRRSMLqOhzIQN14yQBPgMDQ0NTWCEC/LJqISuuMCXwSED/LwgCAkAET6RDBwuvLhTYAH2UTXHBfLhkfpAIfAB+kDSADH6AIIK+vCAG6EhlFMVoKHeItcLAcMAIJIGoZE24iDC//LhkiGOPoIQBRONkchQCc8WUAvPFnEkSRRURqBwgBDIywVQB88WUAX6AhXLahLLH8s/Im6zlFjPFwGRMuIByQH7ABBHlBAqN1viCgBycIIQi3cXNQXIy/9QBM8WECSAQHCAEMjLBVAHzxZQBfoCFctqEssfyz8ibrOUWM8XAZEy4gHJAfsAAIICjjUm8AGCENUydtsQN0QAbXFwgBDIywVQB88WUAX6AhXLahLLH8s/Im6zlFjPFwGRMuIByQH7AJMwMjTiVQLwAwA7O1E0NM/+kAg10nCAJp/AfpA1DAQJBAj4DBwWW1tgAB0A8jLP1jPFgHPFszJ7VSA=")) // Specified base64 data for your collection
    //             .storeRef(royaltyParamsCell)
    //             .storeUint(toNano(0.75), 64)
    //             .endCell();

    //         const state = beginCell()
    //             .storeUint(6, 5) 
    //             //.storeRef(Cell.fromBase64("te6cckECFgEAAjYAART/APSkE/S88sgLAQIBYgINAgLNAwgE7dEGOASK3wAOhpgYC42Eit8H0gGADpj+mf9qJofSBpn+pqammfmEEINJ6cqClIXUcUiy+DNgloQQhUZYBWuEAIZGWCqALnixJ9AQpltQnlj+WfgOeLZMAgfYBwG5PgAPGBE+ABcYEowmOC+XDIk2AB8YEYmwJgAkBAUGBwBINzcD+gDUMCJUSDDwBqRQREUVA8hQBs8WFMs/EszMzMs/ye1UAJA3N3AE1DCOJ4BA9JZvpTEgjhkGpFMHvpPywY/eAfoA1DAlVEsw8AYDpAMFkTHis+YwM1BERRUDyFAGzxYUyz8SzMzMyz/J7VQANjM1AvpAMEFVBAPIUAbPFhTLPxLMzMzLP8ntVABAjhcB1NQwRQPIUAbPFhTLPxLMzMzLP8ntVOBfBYQP8vACASAJDAIBIAoLAC0AcjLP/gozxbJcCDIywET9AD0AMsAyYAAbPkAdMjLAhLKB8v/ydCAAPUWvAEcCHwBXeAGMjLBVjPFlAE+gITy2sSzMzJcfsAgCASAOEwIBIA8QAEe4tdMe1E0PpA0z/U1NTTPzAQNV8F0NQx1DDQccjLBwHPFszJgCASAREgA1tdr9qJofSBpn+pqammfmAqvguhph+mH/SAYQADO09H2omh9IGmf6mpqaZ+YCBKvgvgCOAD4AsAIBIBQVACu5Bb7UTQ+kDTP9TU1NM/MF8D0NQwWIACO46Z7UTQ+kDTP9TU1NM/MGxRjs5/PF")) 
    //             //.storeRef(Cell.fromBase64("te6cckECGAEAAtEAART/APSkE/S88sgLAQIBYgINAgLNAwgE9dGZFjgEkvgfBoaYGAuNhJL4HwfSAYAWmP6Z/2omh9IGmf6mpqaZ/pn5hBCDSenKgpUF1HFQgTr4O2EWhBCFRlgFa4QAhkZYKoAueLEn0BCmW1CeWP5Z+A54tkwCB9gHAcQQgbuTXtqUhdcYEUYADxgRRgAXGBHKjKY4LAQFBgcATBBZXwlmxwXy4ZGCEAX14QBw+wJwgBDIywVYzxYh+gLLasmDBvsAAGI4OSWCCvrwgKAYvvLiKwP6ANQwIlRIMPAGpERlUCPIUAfPFhXLPxPMzMzLP8s/ye1UAN44OXBSBtQwIJ+AQPSWb6VsISCTCKQI3rPmMCeCCvrwgKAXqBm+8uIrjikEgED0lm+lMSCOGQmkUwi+k/LBj94B+gDUMCVUSDDwBgOkAwiRMeKzFeY0NgVQREYWA8hQB88WFcs/E8zMzMs/yz/J7VQAovLhkSbAA44eMzUC+kAwRhZQVQPIUAfPFhXLPxPMzMzLP8s/ye1U4DE3BMAEjhwB1NQwQBZQQxXIUAfPFhXLPxPMzMzLP8s/ye1U4F8GhA/y8AIBIAkMAgEgCgsALQByMs/+CjPFslwIMjLARP0APQAywDJgABs+QB0yMsCEsoHy//J0IAA9Ra8ARwIfAFd4AYyMsFWM8WUAT6AhPLaxLMzMlx+wCAIBIA4VAgEgDxAAS7i10x7UTQ+kDTP9TU1NM/0z8wEEZfBtDUMdQw0HHIywcBzxbMyYAgEgERQCAUgSEwAnrfb2omh9IGmf6mpqaZ/pn5g2MMAAO69r9qJofSBpn+pqammf6Z+YCBMvg2hph+mH/SAYQAA3tPR9qJofSBpn+pqammf6Z+YCBsvg3gCOAD4AsAIBIBYXAC+5Bb7UTQ+kDTP9TU1NM/0z8wXwTQ1DBYgAKbjpntRND6QNM/1NTU0z/TPzAWXwaCEAEgw="))
    //             //.storeRef(Cell.fromBase64("te6cckECGAEAAtgAART/APSkE/S88sgLAQIBYgINAgLNAwgE9dGZFjgEkvgfBoaYGAuNhJL4HwfSAYAWmP6Z/2omh9IGmf6mpqaZ/pn5hBCDSenKgpUF1HFQgTr4O2EWhBCFRlgFa4QAhkZYKoAueLEn0BCmW1CeWP5Z+A54tkwCB9gHAcQQgbuTXtqUhdcYEUYADxgRRgAXGBHKjKY4LAQFBgcATBBZXwlmxwXy4ZGCEAX14QBw+wJwgBDIywVYzxYh+gLLasmDBvsAAHA4OSKkwQPy4U0lggr68ICgGL7y4isD+gDUMCJUSDDwBqREZVAjyFAHzxYVyz8TzMzMyz/LP8ntVADeODlwUgbUMCCfgED0lm+lbCEgkwikCN6z5jAnggr68ICgF6gZvvLiK44pBIBA9JZvpTEgjhkJpFMIvpPywY/eAfoA1DAlVEgw8AYDpAMIkTHisxXmNDYFUERGFgPIUAfPFhXLPxPMzMzLP8s/ye1UAKLy4ZEmwAOOHjM1AvpAMEYWUFUDyFAHzxYVyz8TzMzMyz/LP8ntVOAxNwTABI4cAdTUMEAWUEMVyFAHzxYVyz8TzMzMyz/LP8ntVOBfBoQP8vACASAJDAIBIAoLAC0AcjLP/gozxbJcCDIywET9AD0AMsAyYAAbPkAdMjLAhLKB8v/ydCAAPUWvAEcCHwBXeAGMjLBVjPFlAE+gITy2sSzMzJcfsAgCASAOFQIBIA8QAEu4tdMe1E0PpA0z/U1NTTP9M/MBBGXwbQ1DHUMNBxyMsHAc8WzMmAIBIBEUAgFIEhMAJ6329qJofSBpn+pqammf6Z+YNjDAADuva/aiaH0gaZ/qamppn+mfmAgTL4NoaYfph/0gGEAAN7T0faiaH0gaZ/qamppn+mfmAgbL4N4AjgA+ALACASAWFwAvuQW+1E0PpA0z/U1NTTP9M/MF8E0NQwWIACm46Z7UTQ+kDTP9TU1NM/0z8wFl8GhbOSoL"))
    //             .storeRef(Cell.fromBase64("te6cckECFgEAAkwAART/APSkE/S88sgLAQIBYgINAgLNAwgE99EGOASK3wAOhpgYC42Eit8H0gfQAYAWmP6Z/2omh9IGmf6mpqaZ+YQQg0npyoKUhdRxULL4MZGegJQQhUZYBWuEAIZGWCqALnixJ9AQpltQnlj+WfgOeLZMAgfYBwG8EIG7k17alAXXGBE+AA8YEcqLnjgvlwyJLgAfGBQEBQYHAJQQR18HMo0IYAaAzkb/zCJw29SgLSnsV30MWIFgi2Ze51moMXJqrvm+DMcF8uN4ghAF9eEAcPsCcIAQyMsFWM8WIfoCy2rJgwb7AABcNzckggr68ICgGL7y4isC+gDUMCNURzDwBgGkVTHIUAbPFhTLPxLMzMzLP8ntVAA4MjQB+kAwUFUDRBTIUAbPFhTLPxLMzMzLP8ntVABIMATABI4XAdQwA0RUyFAGzxYUyz8SzMzMyz/J7VTgXwaED/LwAgEgCQwCASAKCwAtAHIyz/4KM8WyXAgyMsBE/QA9ADLAMmAAGz5AHTIywISygfL/8nQgAD1FrwBHAh8AV3gBjIywVYzxZQBPoCE8trEszMyXH7AIAgEgDhMCASAPEABHuLXTHtRND6QNM/1NTU0z8wEDVfBdDUMdQw0HHIywcBzxbMyYAgEgERIAI7R9vaiaH0gaZ/qamppn5g2KMAAztPR9qJofSBpn+pqammfmAgSr4L4AjgA+ALACASAUFQAruQW+1E0PpA0z/U1NTTPzBfA9DUMFiAA1u1m+1E0PpA0z/U1NTTPzAVXwXQ0w/TD/pAMIRdTfKw=="))
    //             .storeRef(collectionData)
    //             .endCell();

    //         const smartContractAddress = new Address(0, state.hash()).toRawString();
    //         console.log(smartContractAddress);
            
    //         const tx: SendTransactionRequest = {
    //             validUntil: Math.round(Date.now() / 1000) + 60 * 5,
    //             messages: [
    //                 {
    //                     address: smartContractAddress,
    //                     amount: '55000000', 
    //                     stateInit: state.toBoc().toString('base64')
    //                 }
    //             ]
    //         };
    
    //         const result = await tonConnectUi.sendTransaction(tx, {
    //             modals: 'all',
    //             notifications: ['error']
    //         });

    //         console.log('Transaction sent successfully:', result);    
            
    //     } catch (e) {
    //         console.error('Error sending transaction:', e);
    //     } finally {
    //         setTxInProgress(false);
    //     }
    // };
    
    const onSendWithdraw = async () => {
        if (!wallet) {
            console.error('Wallet is not connected');
            return;
        }

        setTxInProgress(true);

        try {

            const payloadCell = beginCell()
            .storeUint(0x37726bdb, 32)
            .storeUint(123, 64) // queryId
            .endCell();

            const payload = payloadCell.toBoc().toString('base64');

            const tx: SendTransactionRequest = {
                validUntil: Math.round(Date.now() / 1000) + 60 * 5,
                messages: [
                    {
                        address: "kQCpxvlJN0uuNMfatXCcG9bmkhfcJlRNjOUH8o-acJivyq8e",
                        amount: '50000000',
                        payload                 
                    }
                ]
            };

            const result = await tonConnectUi.sendTransaction(tx, {
                modals: 'all',
                notifications: ['error']
            });
    
            console.log('Transaction sent successfully:', result);

            try {
            } catch (e) {
                console.error('Error waiting for transaction:', e);
            }
        } catch (e) {
            console.error('Error sending transaction:', e);
        } finally {
            setTxInProgress(false);
        }
    };
    
    const onSendMint = async () => {
        if (!wallet) {
            console.error('Wallet is not connected');
            return;
        }
    
        setTxInProgress(true);
    
        try {
            const ownerAddress = Address.parse("0QCsMm47egxSofgw5Y-l34ZeMw6vPYUUyTIjYT3HTafpmH9O");
    
            // Определяем цену за NFT и комиссию
            const pricePerNFT = toNano(0.75); // Цена за NFT
            const commissionPerNFT = toNano(0.05); // Комиссия за NFT
            const totalAmount = pricePerNFT + commissionPerNFT; 

            const payloadCell = beginCell()
                .storeUint(1, 32)
                .storeUint(123, 64)
                // .storeUint(parseInt(itemIndex), 64)
                .storeCoins(toNano(0.05))
                .storeRef(beginCell()
                    .storeAddress(ownerAddress)
                    .storeRef(
                        beginCell().storeStringTail('https://softwaremaestro16.github.io/nft_collection/folder_for_jetton_vote/JettonVote8.json').endCell()
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
                        address: "kQCpxvlJN0uuNMfatXCcG9bmkhfcJlRNjOUH8o-acJivyq8e",
                        amount: totalAmount.toString(), // Используем общую сумму
                        payload
                    }
                ]
            };
    
            // Отправляем транзакцию
            const result = await tonConnectUi.sendTransaction(tx, {
                modals: 'all',
                notifications: ['error']
            });
    
            console.log('Transaction sent successfully:', result);

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
            <button className="mint-button" onClick={onSendMint}> Mint SBT </button>
            <button className="mint-button-2" onClick={onSendWithdraw}> Withdraw TON </button>
        </>   
    )
}
