import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";
import {Header} from "./Header.tsx";
import {SendTx} from "./SendTx.tsx";
import {useEffect, useState} from "react";
import WebAppSDK from '@twa-dev/sdk';

declare global {
  interface Window {
      Telegram?: any;
  }
}

function App() {
  const [, setIsTg] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [friendlyAddress, setFriendlyAddress] = useState<string | null>(null);

  useEffect(() => {
      const isTgCheck = window.Telegram?.WebApp?.initData !== '';

      if (isTgCheck) {
          WebAppSDK.ready();
          WebAppSDK.enableClosingConfirmation();
          WebAppSDK.expand();
          setIsTg(true);

          document.body.style.backgroundColor = 'var(--tg-theme-bg-color)';
          document.body.style.setProperty('background-color', 'var(--tg-theme-bg-color)', 'important');
      }
  }, []);

  useEffect(() => {
      if (walletAddress) {
          // Здесь вы можете преобразовать walletAddress в friendlyAddress
          // Это просто пример, замените его на вашу фактическую логику
          const friendly = walletAddress; // Или используйте функцию для преобразования
          setFriendlyAddress(friendly);
      } else {
          setFriendlyAddress(null);
      }
  }, [walletAddress]);

  return (
    <TonConnectUIProvider
      manifestUrl="https://jetton.vote/tonconnect-manifest.json" // paste url 
      uiPreferences={{
        borderRadius: 'm',
        colorsSet: {
          [THEME.DARK]: {
            connectButton: {
              background: '#29ba2b'  // for connect button
            },
            accent: '#4CAF50', 
            telegramButton: '#66BB6A',  // tg connect button
            background: {
              qr: '#81C784',  // QR
              tint: '#67d45b',  
              primary: '#46b347',  // main background
              secondary: '#2C6B2F', 
              segment: '#4CAF50'  
              },
                text: {
                    primary: '#ffffff',
                    secondary: '#ffffff' 
                },
            }
            }
      }}
      actionsConfiguration={{
        modals: 'all',
        notifications: ['error'],
        // twaReturnUrl: 'https://t.me/jettonvotebot/start' // return back in mini app if connected
      }}
    >
      <div style={{
        textAlign: 'center', 
        padding: '40px 20px', // Increase top padding to lower the text
        color: '#ffffff',
        position: 'relative', // To control vertical alignment
        top: '190px' // Adjust this value to move the text lower or higher
      }}>
        <h1 style={{ 
          fontWeight: 'bolder', 
          fontFamily: 'Arial, sans-serif' 
        }}>
          jetton.vote 🍀
        </h1>
        <h2 style={{ 
          fontWeight: 'bolder', 
          fontFamily: 'Arial, sans-serif' 
        }}>
          Use Testnet Wallet for Mint
        </h2>
      </div>
      <Header setWalletAddress={setWalletAddress} />
      <SendTx friendlyAddress={friendlyAddress} />
    </TonConnectUIProvider>
  );
}

export default App;
