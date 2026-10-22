import Navbar from "./Navbar";

function Header({cantidadTotal}) {
  return (
    <header>
      <Navbar cantidadTotal={cantidadTotal}/>
    </header>
  );
}

export default Header;