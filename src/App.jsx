import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Productos from "./pages/Productos.jsx";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import FinalizarCompra from "./pages/FinalizarCompra";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import productos from "./data/productos.js";
import { Toast, ToastContainer } from "react-bootstrap";


function leerCarritoGuardado() {
  const carritoGuardado = localStorage.getItem("carritoBrote");
  if (!carritoGuardado) {
    return [];
  }

  try {
    const itemsGuardados = JSON.parse(carritoGuardado);
    if (!Array.isArray(itemsGuardados)) {
      return [];
    }

    return itemsGuardados.reduce((carritoActualizado, item) => {
      const producto = productos.find((productoActual) => productoActual.id === item.id);
      if (
        producto &&
        producto.stock > 0 &&
        Number.isInteger(item.cantidad) &&
        item.cantidad > 0
      ) {
        carritoActualizado.push({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          stock: producto.stock,
          cantidad: Math.min(item.cantidad, producto.stock),
        });
      }
      return carritoActualizado;
    }, []);
  } catch {
    console.warn("No se pudo recuperar el carrito guardado. Se iniciará vacío.");
    return [];
  }
}

function App() {
  const [carrito, setCarrito] = useState(leerCarritoGuardado);
  const [notificacion, setNotificacion] = useState(null);
  useEffect(() => {
    localStorage.setItem("carritoBrote", JSON.stringify(carrito)); 
  }, [carrito]);

  function agregarAlCarrito(producto) { 
    if (producto.stock <= 0) {
      return;
    }

    const productoExistente = carrito.find((item) => item.id === producto.id);
    if (productoExistente && productoExistente.cantidad >= producto.stock) {
      return;  //No se muestra el toast si agrego el producto pero ya no tengo stock
    }

    setCarrito((carritoAnterior) => { 
      const productoEnCarrito = carritoAnterior.find((item) => item.id === producto.id);
      if (productoEnCarrito) {
        if (productoEnCarrito.cantidad >= producto.stock) {
          return carritoAnterior;
        }    

        return carritoAnterior.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }

      return [
        ...carritoAnterior,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          stock: producto.stock,
          cantidad: 1,
        },
      ];
    });

    setNotificacion(`¡"${producto.nombre}" se agregó al carrito!`);
  }

  function aumentarCantidad(id) {
    setCarrito((carritoAnterior) =>
      carritoAnterior.map((item) => 
        item.id === id && item.cantidad < item.stock
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  }

  function disminuirCantidad(id) {
    setCarrito((carritoAnterior) =>
      carritoAnterior.map((item) => 
        item.id === id && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  }

  function eliminarDelCarrito(id) { 
    setCarrito((carritoAnterior) => carritoAnterior.filter((item) => item.id !== id));
  }

  function vaciarCarrito() { 
    setCarrito([]);
  }

  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);
  const total = carrito.reduce((totalActual, item) => totalActual + item.precio * item.cantidad, 0);

  return (
    <BrowserRouter>
      <Header  cantidadTotal={cantidadTotal}/>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/productos" element={<Productos agregarAlCarrito={agregarAlCarrito}/>} />
        <Route path="/producto/:id" element={<DetalleProducto agregarAlCarrito={agregarAlCarrito}/>} />
        
        <Route 
          path="/carrito" 
          element={
            <Carrito 
              carrito={carrito}
              cantidadTotal={cantidadTotal}
              total={total}
              agregarAlCarrito={agregarAlCarrito}
              aumentarCantidad={aumentarCantidad}
              disminuirCantidad={disminuirCantidad}
              eliminarDelCarrito={eliminarDelCarrito}
              vaciarCarrito={vaciarCarrito}
            />
          } 
        />
        
        <Route path="/contacto" element={<NotFound />} />
        <Route path="/formulario" element={<FinalizarCompra carrito={carrito} total={total} vaciarCarrito={vaciarCarrito}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />

      <ToastContainer position="bottom-end" className="p-3 position-fixed" style={{ zIndex: 1055 }}>
      <Toast 
        key={notificacion} 
        show={Boolean(notificacion)} 
        onClose={() => setNotificacion(null)} 
        delay={3000} 
        autohide 
        bg="success"
      >
        <Toast.Body className="text-white d-flex justify-content-between align-items-center">
          <span>{notificacion}</span>
          <button 
            type="button" 
            className="btn-close btn-close-white ms-2" 
            onClick={() => setNotificacion(null)}
          />
        </Toast.Body>
      </Toast>
    </ToastContainer>
    </BrowserRouter>
  );
}

export default App;