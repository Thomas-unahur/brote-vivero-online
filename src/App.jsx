import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import Formulario from "./pages/Formulario";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      {/* El Miembro 1 renderizará aquí el <Navbar /> */}
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/productos" element={<Catalogo/>} />
        <Route path="/producto/:id" element={<DetalleProducto/>} />
        <Route path="/carrito" element={<Carrito/>} />
        <Route path="/formulario" element={<Formulario/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      {/* El Miembro 1 renderizará aquí el <Footer /> */}
    </>
  );
}

export default App;