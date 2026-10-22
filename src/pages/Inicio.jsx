import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import styles from './Inicio.module.css';

function Inicio() {
  const navigate = useNavigate();
  
  return (
    <div>
      {/* Primera sección: Hero */}
      <Carousel fade interval={4000} className={styles.heroCarousel}>
        
        {/* Diapositiva 1 */}
        <Carousel.Item className={styles.heroSection}>
          <Container>
            <Row className="align-items-center">
              <Col md={8} lg={6}>
                <h1 className={styles.heroTitle}>Suculentas en oferta</h1>
                <p className={styles.heroSubtitle}>Fáciles de cuidar e ideales para regalar ¡Desde $ 3.900!</p>
                <Button 
                  variant="success" 
                  size="lg" 
                  className={styles.btnSuculentas} 
                  onClick={() => navigate('/productos')}
                >
                  Ver suculentas
                </Button>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>

        {/* Diapositiva 2 */}
        <Carousel.Item className={styles.heroSectionDos}>
          <Container>
            <Row className="align-items-center">
              <Col md={8} lg={6}>
                <h1 className={styles.heroTitle}>Plantas de interior</h1>
                <p className={styles.heroSubtitle}>Llená tus espacios de vida y frescura con nuestra selección.</p>
                <Button 
                  variant="success" 
                  size="lg" 
                  className={styles.btnSuculentas} 
                  onClick={() => navigate('/productos')}
                >
                  Ver catálogo
                </Button>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>

        {/* Diapositiva 3 */}
        <Carousel.Item className={styles.heroSectionTres}>
          <Container>
            <Row className="align-items-center">
              <Col md={8} lg={6}>
                <h1 className={styles.heroTitle}>¡Llega en 24 hs! Comprá hoy y recibilo mañana</h1>
                <p className={styles.heroSubtitle}>Zona Oeste y alrededores</p>
                <Button 
                  variant="success" 
                  size="lg" 
                  className={styles.btnSuculentas} 
                  onClick={() => navigate('/productos')}
                >
                  Ver catálogo
                </Button>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>

      </Carousel>
    
      
      <Container className="my-5">
        <Row className="align-items-center">
          {/* Lado Izquierdo: Presentación */}
          <Col lg={7} className="mb-4 mb-lg-0">
            <div className={styles.badgeVivero}>
              <img src="/img/logo.svg" alt="Logo" className={styles.badgeLogo} />
              <span>VIVERO ONLINE • HURLINGHAM</span>
            </div>

            <h2 className={styles.sectionTitle}>
              Brote, plantas que <span className={styles.italicTitle}>alegran</span> tu casa
            </h2>

            <p className={styles.sectionDescription}>
              Somos un vivero familiar que hace más de 10 años cultiva plantas en el oeste del conurbano. Ahora podés elegirlas desde tu casa: armá tu pedido, nosotros lo preparamos con cuidado y te lo llevamos.
            </p>

            <div className="d-flex gap-3 flex-wrap">
              <Button 
                variant="success" 
                className={styles.btnCatalogo}
                onClick={() => navigate('/productos')}
              >
                Ver catálogo
              </Button>
              <Button 
                variant="outline-success" 
                className={styles.btnConoce}
                onClick={() => navigate('/contacto')}
              >
                Conocé el vivero
              </Button>
            </div>
          </Col>
          
          <Col lg={5}>
            <div className="d-flex flex-column gap-3">
              {/* Tarjeta 1 */}
              <div className={styles.cardBeneficio}>
                <div className={styles.iconContainer}>
                  <img src="/img/banner-envios.svg" alt="Envíos" className={styles.iconImg} />
                </div>
                <div>
                  <h6 className={styles.cardTitle}>Envíos a domicilio</h6>
                  <p className={styles.cardText}>Llevamos tus plantas bien embaladas a Hurlingham y alrededores.</p>
                </div>
              </div>

              {/* Tarjeta 2 */}
              <div className={styles.cardBeneficio}>
                <div className={styles.iconContainer}>
                  <img src="/img/logo.svg" alt="Plantas sanas" className={styles.iconImg} />
                </div>
                <div>
                  <h6 className={styles.cardTitle}>Plantas sanas</h6>
                  <p className={styles.cardText}>Las cuidamos en el vivero hasta el día que llegan a tu casa.</p>
                </div>
              </div>

              {/* Tarjeta 3 */}
              <div className={styles.cardBeneficio}>
                <div className={styles.iconContainer}>
                  <span className={styles.iconEmoji}>💬</span>
                </div>
                <div>
                  <h6 className={styles.cardTitle}>Te asesoramos</h6>
                  <p className={styles.cardText}>Te contamos cómo cuidar cada tipo de planta.</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Inicio;