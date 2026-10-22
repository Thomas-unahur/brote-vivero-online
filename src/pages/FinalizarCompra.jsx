import FormularioCompra from "../components/FormularioCompra";
import {Link} from "react-router-dom";
import { Container, Row, Col, Badge, ListGroup } from 'react-bootstrap';
import { formatearPrecio } from "../utils/formato.js";
import { useState } from "react";
const FinalizarCompra = (props) => {

    const [compraFinalizada,setCompraFinalizada] = useState(false);

    if (!compraFinalizada && (!props.carrito || props.carrito.length === 0)) {
        return (
            <Container className="mt-5 mb-5 text-center">
                <h1 className="texto-verde-oscuro">Tu carrito está vacío</h1>
                <p className="texto-suave">Agregá productos antes de finalizar la compra.</p>
                <Link to="/productos" className="btn btn-verde">Ver productos</Link>
            </Container>
        );
    }

    return(
        <Container className="mt-5 mb-5">
            <Row className="mb-4">
                <Col>
                    <span className="texto-terracota fw-bold text-uppercase">Último paso</span>
                    <h1 className="texto-verde-oscuro fw-bold display-4">Finalizar compra</h1>
                    <p className="fs-5 texto-suave">Completá tus datos para que podamos preparar y entregar tu pedido.</p>
                </Col>
            </Row>
            
            <Row className="g-4">
                <Col xs={12} md={compraFinalizada ? 10 : 7} lg={compraFinalizada ? 8 : 6} className={compraFinalizada ? "mx-auto" : ""}>
                    <FormularioCompra
                        carrito={props.carrito}
                        total={props.total}
                        vaciarCarrito={props.vaciarCarrito}
                        onCompraExitosa={() => setCompraFinalizada(true)}
                    />
                </Col>

                {!compraFinalizada && (<Col xs={12} md={5} lg={6}>
                    <div className="bg-light p-4 rounded-3 border">
                        <h3 className="texto-verde-oscuro mb-4">Resumen de tu pedido</h3>
                        <ListGroup variant="flush" className="mb-3">
                            {props.carrito.map((item) => (
                                <ListGroup.Item
                                    key={item.id}
                                    className="d-flex align-items-center gap-3 bg-transparent"
                                >
                                    <img src={item.imagen} alt={item.nombre} width="56" height="56" className="rounded" />
                                    <div className="flex-grow-1">
                                        <span className="d-block">{item.nombre}</span>
                                        <Badge bg="secondary">x{item.cantidad}</Badge>
                                    </div>
                                    <strong>{formatearPrecio(item.precio * item.cantidad)}</strong>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>

                        <div className="d-flex justify-content-between border-top pt-3 fs-5 fw-bold">
                            <span>Total</span>
                            <span>{formatearPrecio(props.total)}</span>
                        </div>
                    </div>
                </Col>)}
            </Row>
        </Container>
    )
}

export default FinalizarCompra;