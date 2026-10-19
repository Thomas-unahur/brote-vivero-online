import { useParams, Link } from 'react-router-dom';
import productos from '/src/data/productos.js';

const DetalleProducto = () => {
    const {id} = useParams();
    const producto = productos.find(producto => producto.id == id);

    if(!producto){
         return <div className="container mt-4"><h3>El producto no existe.</h3></div>;
    }
    return (
        <div className="container mt-4">
            <div className="row">
              <div className="col-12 col-md-5 mb-4 mb-md-0">
                 <img 
                        src={producto.imagen} 
                        alt={producto.nombre} 
                        className="img-fluid border border-1 rounded-4 shadow-sm" 
                    />
              </div>


    <div className="col-12 col-md-7">


    <span className='texto-verde'>{producto.categoria}</span>
    <h2>{producto.nombre}</h2>
    
    <div className="d-flex align-items-center gap-3 mb-3">
        {producto.etiqueta && (
            <span className="badge bg-terracota rounded-pill px-3 py-2 fw-normal">
                {producto.etiqueta}
            </span>
        )}
        <span className="fs-3 fw-bold texto-verde-oscuro">${producto.precio}</span>

        <span>{producto.precioAnterior && 
        (<span className='text-decoration-line-through text-muted fs-6'>${producto.precioAnterior}</span>)}
        </span>

    </div>

    <div className="d-flex align-items-center mb-4">
        <span className="texto-verde fw-bold">Stock disponible:</span>
        <span className="texto-verde ms-1">{producto.stock} unidades</span>
    </div>

    <p className='texto-suave'>{producto.descripcionLarga}</p>
    <h4 className='texto-verde-oscuro'>Características principales</h4>
    <ul className='list-unstyled'>
        {producto.caracteristicas.map((item,indice) =>
        (<li className='border-bottom border-1' key={indice}>{item}</li>))}
    </ul>
    <div className='d-flex gap-2'>
        <button className='btn btn-verde'>Agregar al carrito</button>
        <Link to="/productos" className="btn btn-outline-verde">Volver al catálogo</Link>
    </div> 
    </div>    

    </div>
          
    </div>
    );

    
}
export default DetalleProducto;
