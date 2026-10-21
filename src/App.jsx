import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import Formulario from "./pages/Formulario";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/productos" element={<Catalogo/>} />
        <Route path="/producto/:id" element={<DetalleProducto/>} />
        <Route path="/carrito" element={<Carrito/>} />
        <Route path="/formulario" element={<Formulario/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;