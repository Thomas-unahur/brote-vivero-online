import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Carrito from "./pages/Carrito.jsx";
import productos from "./data/productos.js";

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

  useEffect(() => {
    localStorage.setItem("carritoBrote", JSON.stringify(carrito)); // Guardar el carrito en localStorage cada vez que cambie
  }, [carrito]);

  function agregarAlCarrito(producto) { // agrega un producto al carrito
    if (producto.stock <= 0) {
      return;
    }

    setCarrito((carritoAnterior) => { // actualizo el estado del carrito anterior
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
  }

  function aumentarCantidad(id) {
    setCarrito((carritoAnterior) =>
      carritoAnterior.map((item) => // si el id del item coincide con el id pasado como parámetro y la cantidad del item es menor al stock disponible, aumentamos la cantidad en 1
        item.id === id && item.cantidad < item.stock
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  }

  function disminuirCantidad(id) {
    setCarrito((carritoAnterior) =>
      carritoAnterior.map((item) => // si el id del item coincide con el id pasado como parámetro y la cantidad del item es mayor a 1, disminuimos la cantidad en 1
        item.id === id && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  }

  function eliminarDelCarrito(id) { // eliminamos un item del carrito filtrando el carrito anterior y devolviendo un nuevo array (sin el item cuyo id coincide con el id pasado como parámetro)
    setCarrito((carritoAnterior) => carritoAnterior.filter((item) => item.id !== id));
  }

  function vaciarCarrito() { // vaciamos el carrito estableciendo el estado del carrito a un array vacío
    setCarrito([]);
  }

  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);
  const total = carrito.reduce((totalActual, item) => totalActual + item.precio * item.cantidad, 0);

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<div>Página de Inicio</div>} />
        <Route path="/productos" element={<div>Catálogo</div>} />
        <Route path="/producto/:id" element={<div>Detalle de Producto</div>} />
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
        <Route path="/contacto" element={<div>Finalizar Compra</div>} />
      </Routes>
      {/*FOOTER*/}
    </BrowserRouter>
  );
}

export default App;