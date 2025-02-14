import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ContextApp  from "./context/ContextApp.jsx";
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
    <ContextApp>
      <App />
    </ContextApp>
    </BrowserRouter>
  </StrictMode>,
)
