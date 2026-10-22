import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="container py-5 text-center d-flex flex-column align-items-center justify-content-center">
      <div className="mb-4" style={{ maxWidth: "420px", width: "100%" }}>
        <img
          src="/img/404.not.found.jfif"
          alt="Página no encontrada (Error 404)"
          className="img-fluid rounded-4 shadow-sm"
        />
      </div>

      <h1 className="display-5 fw-bold mb-3">Página no encontrada</h1>
      <p className="texto-suave fs-5 mb-4" style={{ maxWidth: "520px" }}>
        La dirección a la que intentás acceder no existe o fue movida. Podés
        volver al inicio o explorar nuestro catálogo de plantas.
      </p>

      <div className="d-flex flex-wrap justify-content-center gap-3">
        <Link to="/" className="btn btn-verde px-4 py-2">
          Volver al inicio
        </Link>
        <Link to="/productos" className="btn btn-outline-verde px-4 py-2">
          Ver productos
        </Link>
      </div>
    </main>
  );
}

export default NotFound;