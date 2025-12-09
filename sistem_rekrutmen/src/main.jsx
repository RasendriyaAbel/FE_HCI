import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Get base path from Vite config (import.meta.env.BASE_URL)
// Default to /FE_HCI/ for GitHub Pages
const basename = import.meta.env.BASE_URL || '/FE_HCI/';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
