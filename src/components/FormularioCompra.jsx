import { useState } from "react";
import { Link } from "react-router-dom";
import { formatearPrecio } from "../utils/formato.js";
import { Form, Button, Alert, ListGroup, Badge } from "react-bootstrap";

const FormularioCompra = ({ carrito = [], total = 0 , vaciarCarrito, onCompraExitosa}) => {

    const [paso, setPaso] = useState(1);
    const [formData, setFormData] = useState({
        nombre_y_apellido: "",
        email: "",
        telefono: "",
        direccion: "",
        metodo_entrega: "",
        aclaracion: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "telefono") {
            const soloNumeros = /^[0-9]*$/;
            if (!soloNumeros.test(value)) return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const avanzarARevision = (e) => {
        e.preventDefault();
        
        if (
            formData.nombre_y_apellido.trim() === "" ||
            formData.email.trim() === "" ||
            formData.telefono.trim() === "" ||
            formData.direccion.trim() === "" ||
            formData.metodo_entrega === ""
        ) {
            setError("Por favor, completa todos los campos con asterisco (*).");
            return;
        }

        setPaso(2);
    };

    const confirmarCompraDefinitiva = () => {
        onCompraExitosa();
        vaciarCarrito();
        setPaso(3); 
    };

    if (paso === 3) {
        return (
            <div className="bg-white p-5 border border-1 rounded-2 text-center mt-4 shadow-sm">
                <h2 className="texto-verde-oscuro mb-3">¡Gracias por tu compra, {formData.nombre_y_apellido}!</h2>
                <p className="fs-5 texto-suave">
                    Hemos registrado tu pedido con éxito. Te enviaremos un email con el detalle a <strong>{formData.email}</strong>.
                    <br/><br/>
                    {formData.metodo_entrega === 'domicilio'
                        ? `Pronto lo enviaremos a tu domicilio en ${formData.direccion}.`
                        : 'Te esperamos en la sucursal (Av. Vergara 2222, Hurlingham) para que lo retires.'}
                </p>
                <Button as={Link} to="/" className="btn-verde mt-4">Volver al inicio</Button>
            </div>
        );
    }

    if (paso === 2) {
        return (
            <div className="bg-white p-4 border border-1 rounded-3 shadow-sm">
                <h3 className="texto-verde-oscuro mb-4 border-bottom pb-2">Revisá tu pedido</h3>
                
                <h5 className="mb-3">Tus Datos</h5>
                <ListGroup className="mb-4">
                    <ListGroup.Item><strong>Nombre:</strong> {formData.nombre_y_apellido}</ListGroup.Item>
                    <ListGroup.Item><strong>Email:</strong> {formData.email}</ListGroup.Item>
                    <ListGroup.Item><strong>Teléfono:</strong> {formData.telefono}</ListGroup.Item>
                    <ListGroup.Item><strong>Dirección:</strong> {formData.direccion}</ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Entrega:</strong> {formData.metodo_entrega === 'domicilio' ? 'Envío a domicilio' : 'Retiro por sucursal'}
                    </ListGroup.Item>
                    {formData.aclaracion && (
                        <ListGroup.Item className="text-muted"><em>Aclaración: {formData.aclaracion}</em></ListGroup.Item>
                    )}
                </ListGroup>

                <h5 className="mb-3">Tus Productos</h5>
                <ListGroup className="mb-4">
                    {carrito.length > 0 ? (
                        carrito.map((item, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                <span>{item.nombre} <Badge bg="secondary" className="ms-2">x{item.cantidad}</Badge></span>
                                <span>${formatearPrecio(item.precio * item.cantidad)}</span>
                            </ListGroup.Item>
                        ))
                    ) : (
                        <ListGroup.Item className="text-muted fst-italic">El carrito esta vacío</ListGroup.Item>
                    )}
                    <ListGroup.Item variant="success" className="d-flex justify-content-between fw-bold fs-5">
                        <span>Total a Pagar:</span>
                        <span>{formatearPrecio(total)}</span>
                    </ListGroup.Item>
                </ListGroup>

                <div className="d-flex gap-2 justify-content-end mt-4">
                    <Button variant="outline-secondary" onClick={() => setPaso(1)}>Modificar Datos</Button>
                    <Button onClick={confirmarCompraDefinitiva} className="btn-verde">Confirmar y Comprar</Button>
                </div>
            </div>
        );
    }

    return (
        <Form onSubmit={avanzarARevision} className="bg-white p-4 border border-1 rounded-3 shadow-sm">
            <h3 className="texto-verde-oscuro mb-4">Completá tus datos</h3>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3">
                <Form.Label className="texto-suave fw-bold">Nombre y Apellido *</Form.Label>
                <Form.Control 
                    type="text" 
                    name="nombre_y_apellido"
                    value={formData.nombre_y_apellido}
                    onChange={handleChange}
                />
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label className="texto-suave fw-bold">Email *</Form.Label>
                <Form.Control 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label className="texto-suave fw-bold">Teléfono *</Form.Label>
                <Form.Control 
                    type="tel" 
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                />
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label className="texto-suave fw-bold">Dirección *</Form.Label>
                <Form.Control 
                    type="text" 
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                />
            </Form.Group>

            <div className="mt-4">
                <h4 className="texto-verde-oscuro mb-3">Opciones de Entrega</h4>
                <Form.Group className="mb-3">
                    <Form.Label className="texto-suave fw-bold">Método de entrega *</Form.Label>
                    <Form.Select 
                        name="metodo_entrega" 
                        value={formData.metodo_entrega} 
                        onChange={handleChange}
                    >
                        <option value="" disabled>Seleccionar...</option>
                        <option value="domicilio">Envío a domicilio (Gratis en Hurlingham y alrededores)</option>
                        <option value="sucursal">Retiro por sucursal (Av. Vergara 2222, Hurlingham)</option>       
                    </Form.Select>    
                </Form.Group>
            </div>

            <Form.Group className="mb-4 mt-2">
                <Form.Label className="texto-suave fw-bold">Aclaración (Opcional)</Form.Label>
                <Form.Control 
                    as="textarea"
                    rows={3}
                    name="aclaracion"
                    value={formData.aclaracion}
                    onChange={handleChange}
                    placeholder="Dejanos un comentario o la información que creas necesaria sobre la entrega..."
                />
            </Form.Group>

            <div className="d-flex gap-2 mt-4 pt-3 border-top">
                <Button type="submit" className="btn-verde px-4">Revisar Pedido</Button>
                <Button as={Link} to="/productos" variant="outline-verde">Volver al catálogo</Button>
            </div>
        </Form>
    );
}

export default FormularioCompra;