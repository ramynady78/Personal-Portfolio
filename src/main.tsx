import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.css';
import App from './App.tsx';
import { TranslationProvider } from "../src/components/TranslationContext.ts";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <TranslationProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TranslationProvider>
  </StrictMode>,
)
