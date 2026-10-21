import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetalleProducto from '/src/pages/DetalleProducto';
import FinalizarCompra from "./pages/FinalizarCompra";
function App() {
  return (
    <BrowserRouter>
      {/* El Miembro 1 renderizará aquí el <Navbar /> */}
      <Routes>
        <Route path="/" element={<div>Página de Inicio</div>} />
        <Route path="/productos" element={<div>Catálogo</div>} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<div>Carrito</div>} />
        <Route path="/contacto" element={<FinalizarCompra />} /> {/*prueba de finalizar compra */}
      </Routes>
      {/* El Miembro 1 renderizará aquí el <Footer /> */}
    </BrowserRouter>
  );
}

export default App;