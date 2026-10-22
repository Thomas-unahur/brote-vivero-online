import { Link } from "react-router-dom";
import estilos from "./ProductoCard.module.css";
import { formatearPrecio, claseEtiqueta } from "../utils/formato.js";

// Tarjeta de un producto del catálogo.
// Recibe por props el producto y la función agregarAlCarrito (la arma quien hace el carrito).
function ProductoCard(props) {
  const producto = props.producto;
  const hayStock = producto.stock > 0;
  const linkDetalle = "/producto/" + producto.id;

  // Texto y color de la disponibilidad según el stock.
  // Arrancamos con el caso normal y lo cambiamos si no hay stock o quedan pocas unidades.
  let textoStock = "Stock disponible: " + producto.stock + " unidades";
  let claseStock = estilos.stock;
  if (!hayStock) {
    textoStock = "No disponible por el momento";
    claseStock = estilos.stockAgotado;
  } else if (producto.stock === 1) {
    textoStock = "¡Última unidad!";
    claseStock = estilos.stockPocos;
  } else if (producto.stock <= 3) {
    textoStock = "¡Últimas " + producto.stock + " unidades!";
    claseStock = estilos.stockPocos;
  }

  function manejarAgregar() {
    // Mientras el carrito no esté conectado en App.jsx esta función puede no venir,
    // por eso revisamos que exista antes de llamarla
    if (props.agregarAlCarrito) {
      props.agregarAlCarrito(producto);
    }
  }

  return (
    <div className={`card ${estilos.tarjeta}`}>
      {/* tabIndex -1: con la tecla Tab no se para en la imagen (ya están el nombre y "Ver detalle") */}
      <Link to={linkDetalle} className={estilos.contenedorImagen} tabIndex={-1}>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className={hayStock ? estilos.imagen : `${estilos.imagen} ${estilos.imagenSinStock}`}
        />
        {producto.etiqueta !== "" ? (
          <span className={`badge ${claseEtiqueta(producto.etiqueta)} ${estilos.etiqueta}`}>
            {producto.etiqueta}
          </span>
        ) : null}
        {hayStock ? null : <span className={estilos.sinStock}>Sin stock</span>}
      </Link>

      <div className={`card-body ${estilos.cuerpo}`}>
        <span className={estilos.categoria}>{producto.categoria}</span>
        <h3 className={estilos.nombre}>
          <Link to={linkDetalle}>{producto.nombre}</Link>
        </h3>
        <p className={estilos.descripcion}>{producto.descripcion}</p>

        <div className={estilos.pie}>
          <div className={estilos.precios}>
            <span className={estilos.precio}>{formatearPrecio(producto.precio)}</span>
            {producto.precioAnterior ? (
              <span className={estilos.precioAnterior}>{formatearPrecio(producto.precioAnterior)}</span>
            ) : null}
          </div>
          <p className={claseStock}>{textoStock}</p>

          <div className={estilos.botones}>
            <Link to={linkDetalle} className="btn btn-outline-verde">
              Ver detalle
            </Link>
            <button type="button" className="btn btn-verde" disabled={!hayStock} onClick={manejarAgregar}>
              {hayStock ? "Agregar al carrito" : "Sin stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductoCard;
