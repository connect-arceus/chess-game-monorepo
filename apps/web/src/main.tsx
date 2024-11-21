import { createRoot } from 'react-dom/client'
import { SocketProvider } from './context/SocketProvider.tsx'
import App from './App.tsx'
import './index.css'
import { RecoilRoot } from 'recoil';

createRoot(document.getElementById("root")!).render(
    <RecoilRoot>
        <SocketProvider>
            <App />
        </SocketProvider>
    </RecoilRoot>
);
