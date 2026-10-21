export default CarritoItem;

function formatearPrecio(precio) {
  return "$ " + precio.toLocaleString("es-AR"); // formatea el precio con el símbolo de peso
                                                //  y separadores de miles
}

function CarritoItem(props) { // representa un item del carrito de compras
  const { item } = props; // desestructuramos el objeto item de las props para acceder a sus propiedades
  const subtotal = item.precio * item.cantidad; // calculamos el subtotal del item multiplicando el precio por la cantidad
  const llegoAlMaximo = item.cantidad >= item.stock; // verificamos si la cantidad del item llegó al stock máximo disponible

  return ( // retornamos el JSX que representa el item del carrito de compras
    <article className="card p-3">
      <div className="row align-items-center g-3">
        <div className="col-3 col-md-2">
          <img src={item.imagen} alt={item.nombre} className="img-fluid rounded" />
        </div>
        <div className="col-9 col-md-4">
          <h2 className="h5 mb-1">{item.nombre}</h2>
          <p className="mb-1">Precio por unidad: {formatearPrecio(item.precio)}</p>
          {llegoAlMaximo && <small className="text-success">Stock máximo disponible</small>}
        </div>
        <div className="col-6 col-md-3">
          <span className="d-block">Cantidad</span>
          <div className="btn-group" role="group" aria-label={"Cantidad de " + item.nombre}>
            <button
              type="button"
              className="btn btn-outline-success"
              disabled={item.cantidad === 1}
              onClick={() => props.disminuirCantidad(item.id)}
            >
              -
            </button>
            <span className="btn btn-outline-secondary disabled">{item.cantidad}</span>
            <button
              type="button"
              className="btn btn-outline-success"
              disabled={llegoAlMaximo}
              onClick={() => props.aumentarCantidad(item.id)}
            >
              +
            </button>
          </div>
        </div>
        <div className="col-6 col-md-2">
          <span className="d-block">Subtotal</span>
          <strong>{formatearPrecio(subtotal)}</strong>
        </div>
        <div className="col-12 col-md-1">
          <button
            type="button"
            className="btn btn-link text-danger px-0"
            onClick={() => props.eliminarDelCarrito(item.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}


