
import { Link } from "react-router-dom";
import CarritoItem from "../components/CarritoItem.jsx";

function formatearPrecio(precio) { // formatear el precio con el símbolo de pesos y separadores de miles
  return "$ " + precio.toLocaleString("es-AR");
}

function Carrito(props) { // representa la página del carrito de compras
  function confirmarVaciado() { // función para confirmar si el usuario quiere vaciar el carrito
    if (window.confirm("¿Seguro que querés vaciar el carrito?")) {
      props.vaciarCarrito();
    }
  }

  if (props.carrito.length === 0) { // si el carrito está vacío, mostramos un mensaje y un botón para ir a la página de productos
    return (
      <main className="container py-5 text-center">
        <h1>Tu carrito está vacío</h1>
        <p>Todavía no agregaste productos.</p>
        <Link to="/productos" className="btn btn-success"> // botón para ir a la página de productos
          Ver productos
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <h1>Carrito de compras</h1>
      <p>
        Tenés {props.cantidadTotal}{" "}
        {props.cantidadTotal === 1 ? "producto" : "productos"} en tu carrito.
      </p>

      <div className="row g-4">
        <section className="col-lg-8">
          <div className="d-grid gap-3">
            {props.carrito.map((item) => (
              <CarritoItem
                key={item.id}
                item={item}
                aumentarCantidad={props.aumentarCantidad}
                disminuirCantidad={props.disminuirCantidad}
                eliminarDelCarrito={props.eliminarDelCarrito}
              />
            ))}
          </div>

          <div className="d-flex justify-content-between gap-2 mt-3">
            <Link to="/productos" className="btn btn-outline-success">
              Seguir comprando
            </Link>
            <button type="button" className="btn btn-outline-danger" onClick={confirmarVaciado}>
              Vaciar carrito
            </button>
          </div>
        </section>

        <aside className="col-lg-4">
          <div className="card p-4">
            <h2 className="h4">Resumen de compra</h2>
            <div className="d-flex justify-content-between">
              <span>Cantidad total</span>
              <strong>{props.cantidadTotal}</strong>
            </div>
            <div className="d-flex justify-content-between border-top mt-3 pt-3">
              <span>Total</span>
              <strong>{formatearPrecio(props.total)}</strong>
            </div>
            <Link to="/contacto" className="btn btn-success w-100 mt-3">
              Finalizar compra
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Carrito;
