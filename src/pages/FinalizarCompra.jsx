import FormularioCompra from "../components/FormularioCompra";
import { Container, Row, Col } from 'react-bootstrap';

const FinalizarCompra = () => {
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
                <Col xs={12} md={7} lg={6}>
                    <FormularioCompra />  
                </Col>  

                <Col xs={12} md={5} lg={6}>
                    <div className="bg-light p-4 rounded-3 border">
                        <h3 className="texto-verde-oscuro mb-4">Resumen de tu pedido</h3>
                        <p className="text-muted fst-italic">
                            (Detalle del carrito)
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default FinalizarCompra;