import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.text}>
          &copy; {new Date().getFullYear()} Brote Vivero Online. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;