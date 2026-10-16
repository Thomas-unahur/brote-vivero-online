import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Bootstrap tiene que importarse ANTES que App: si no, los estilos de Bootstrap
// quedan después y pisan los .module.css de nuestros componentes
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)