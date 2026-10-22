import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductoCard from "../components/ProductoCard.jsx";
import productos, { categorias } from "../data/productos.js";
import { normalizarTexto } from "../utils/formato.js";
import estilos from "./Productos.module.css";

// Página del catálogo: muestra todos los productos con el buscador y los filtros.
// Cuando el carrito esté listo, App.jsx le va a pasar agregarAlCarrito por props
// y acá se la pasamos a cada tarjeta (lo arma el integrante del carrito).
function Productos(props) {
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("destacados");
  const [soloConStock, setSoloConStock] = useState(false);

  // La categoría la guardamos en la URL como query string (ej: /productos?categoria=Interior).
  // Así desde el Inicio o el Footer se puede entrar directo a una categoría.
  // El valor tiene que ser una de las categorías de src/data/productos.js.
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaUrl = searchParams.get("categoria") ?? "Todas";
  // find busca la categoría en la lista sin importar mayúsculas ni tildes ("interior" sirve).
  // Si no la encuentra devuelve undefined y con ?? mostramos todas.
  const categoria =
    categorias.find((item) => normalizarTexto(item) === normalizarTexto(categoriaUrl)) ?? "Todas";

  // setSearchParams cambia la parte ?categoria=... de la URL.
  // Con {} la borra y se vuelven a ver todas las categorías.
  function cambiarCategoria(nuevaCategoria) {
    // Si ya está elegida no hacemos nada (así no se repite la página en el historial)
    if (nuevaCategoria === categoria) {
      return;
    }
    if (nuevaCategoria === "Todas") {
      setSearchParams({});
    } else {
      setSearchParams({ categoria: nuevaCategoria });
    }
  }

  function limpiarFiltros() {
    setBusqueda("");
    setOrden("destacados");
    setSoloConStock(false);
    if (categoria !== "Todas") {
      setSearchParams({});
    }
  }

  // 1) Buscador por nombre. filter devuelve un array nuevo, el original no se modifica.
  // includes se fija si el texto buscado está adentro del nombre. Si el buscador está
  // vacío, includes("") da true y por eso se ven todos los productos.
  const textoBuscado = normalizarTexto(busqueda);
  let productosFiltrados = productos.filter((producto) =>
    normalizarTexto(producto.nombre).includes(textoBuscado)
  );

  // 2) Filtro por categoría
  if (categoria !== "Todas") {
    productosFiltrados = productosFiltrados.filter((producto) => producto.categoria === categoria);
  }

  // 3) Filtro de productos con stock
  if (soloConStock) {
    productosFiltrados = productosFiltrados.filter((producto) => producto.stock > 0);
  }

  // 4) Orden. Con "destacados" no ordenamos: quedan en el orden del array de productos.
  // sort cambia el array sobre el que se usa, pero como productosFiltrados ya es una
  // copia (salió de filter), no tocamos el array original de productos.
  // sort compara los productos de a dos: si a.precio - b.precio da negativo, a queda antes
  // que b (de menor a mayor). Con b.precio - a.precio queda al revés.
  if (orden === "menor") {
    productosFiltrados.sort((a, b) => a.precio - b.precio);
  } else if (orden === "mayor") {
    productosFiltrados.sort((a, b) => b.precio - a.precio);
  } else if (orden === "nombre") {
    // localeCompare compara dos textos en orden alfabético (tiene en cuenta tildes y ñ)
    productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  const hayFiltrosActivos =
    busqueda !== "" || categoria !== "Todas" || soloConStock || orden !== "destacados";

  return (
    <div className="container py-4 py-lg-5">
      <header className={estilos.encabezado}>
        <span className={estilos.sobretitulo}>Catálogo</span>
        <h1>Nuestros productos</h1>
        <p>Plantas de interior y exterior, suculentas, macetas y todo para cuidarlas.</p>
      </header>

      {/* Buscador y filtros. aria-label le pone un nombre a la sección para los lectores de pantalla */}
      <section className={estilos.panelFiltros} aria-label="Buscador y filtros">
        <div className="row g-3 align-items-end">
          <div className="col-md-6 col-lg-5">
            <label htmlFor="buscador" className="form-label">
              Buscar por nombre
            </label>
            <input
              id="buscador"
              type="search"
              className="form-control"
              placeholder="Ej: monstera, cactus, maceta..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="col-sm-6 col-md-3">
            <label htmlFor="orden" className="form-label">
              Ordenar por
            </label>
            <select
              id="orden"
              className="form-select"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
            >
              <option value="destacados">Destacados</option>
              <option value="menor">Precio: menor a mayor</option>
              <option value="mayor">Precio: mayor a menor</option>
              <option value="nombre">Nombre (A - Z)</option>
            </select>
          </div>

          <div className="col-sm-6 col-md-3 col-lg-4">
            <div className={`form-check form-switch ${estilos.switchStock}`}>
              {/* role="switch" viene del ejemplo de form-switch de Bootstrap: el checkbox se lee como interruptor */}
              <input
                id="solo-stock"
                type="checkbox"
                role="switch"
                className="form-check-input"
                checked={soloConStock}
                onChange={(e) => setSoloConStock(e.target.checked)}
              />
              <label htmlFor="solo-stock" className="form-check-label">
                Solo productos con stock
              </label>
            </div>
          </div>
        </div>

        {/* aria-pressed le avisa a los lectores de pantalla qué categoría está elegida */}
        <div className={estilos.categorias} role="group" aria-label="Filtrar por categoría">
          <button
            type="button"
            className={categoria === "Todas" ? "btn btn-sm btn-verde" : "btn btn-sm btn-outline-verde"}
            aria-pressed={categoria === "Todas"}
            onClick={() => cambiarCategoria("Todas")}
          >
            Todas
          </button>
          {categorias.map((item) => (
            <button
              key={item}
              type="button"
              className={categoria === item ? "btn btn-sm btn-verde" : "btn btn-sm btn-outline-verde"}
              aria-pressed={categoria === item}
              onClick={() => cambiarCategoria(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <div className={estilos.barraResultados}>
        {/* aria-live="polite": el lector de pantalla lee este texto cada vez que cambia */}
        <p className="mb-0" aria-live="polite">
          Mostrando <strong>{productosFiltrados.length}</strong> de {productos.length} productos
          {categoria !== "Todas" ? " en " + categoria : ""}
        </p>
        {hayFiltrosActivos ? (
          <button type="button" className={`btn btn-link ${estilos.linkLimpiar}`} onClick={limpiarFiltros}>
            Limpiar filtros
          </button>
        ) : null}
      </div>

      {/* Título oculto (visually-hidden es de Bootstrap) para que los títulos vayan en orden: h1, h2, h3 */}
      <h2 className="visually-hidden">Resultados</h2>

      {productosFiltrados.length === 0 ? (
        <div className={estilos.sinResultados}>
          {/* alt vacío porque el logo acá es solo decorativo */}
          <img src="/img/logo.svg" alt="" width="72" height="72" />
          <h3>No encontramos productos</h3>
          <p>Probá con otra búsqueda o sacá algunos filtros.</p>
          <button type="button" className="btn btn-verde" onClick={limpiarFiltros}>
            Ver todos los productos
          </button>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {productosFiltrados.map((producto) => (
            <div className="col" key={producto.id}>
              <ProductoCard producto={producto} agregarAlCarrito={props.agregarAlCarrito} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Productos;
