function Contacto() {
  return (
    <main className="container py-5">
      <div className="row g-4 justify-content-center">
        <section className="col-12 col-lg-8">
          <h1 className="mb-3">Contacto</h1>
          <p className="texto-suave mb-4">
            Vení a conocer nuestro vivero y recibir asesoramiento personalizado
            sobre el cuidado de tus plantas.
          </p>

          <div className="card border-0 shadow-sm p-4 mb-4">
            <h2 className="h5 mb-3">Información de visita</h2>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <strong>Dirección:</strong> Av. Vergara 2222, Hurlingham
              </li>
              <li className="mb-2">
                <strong>Horarios:</strong> Lunes a Sábados de 9:00 a 18:00 hs
              </li>
              <li>
                <strong>Email:</strong> contacto@brotevivero.com.ar
              </li>
            </ul>
          </div>

          <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow-sm">
            <iframe
              title="Ubicación de Brote Vivero en Google Maps"
              src="https://maps.google.com/maps?q=Av.+Vergara+2222,+Hurlingham&t=&z=15&ie=UTF8&iwloc=&output=embed"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Contacto;
