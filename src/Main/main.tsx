import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './style.css'

import App from '../App/App'

// react-router-dom
// tanstack/react-query
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
