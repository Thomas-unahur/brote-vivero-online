import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* El Miembro 1 renderizará aquí el <Navbar /> */}
      <Routes>
        <Route path="/" element={<div>Página de Inicio</div>} />
        <Route path="/productos" element={<div>Catálogo</div>} />
        <Route path="/producto/:id" element={<div>Detalle de Producto</div>} />
        <Route path="/carrito" element={<div>Carrito</div>} />
        <Route path="/contacto" element={<div>Finalizar Compra</div>} />
      </Routes>
      {/* El Miembro 1 renderizará aquí el <Footer /> */}
    </BrowserRouter>
  );
}

export default App;