// Funciones de ayuda para mostrar los productos (las puede usar cualquier parte de la app).

// Muestra un número como precio en pesos. Ejemplo: 18500 -> "$ 18.500"
export function formatearPrecio(precio) {
  return "$ " + precio.toLocaleString("es-AR");
}

// Cambia las vocales con tilde por la misma vocal sin tilde, letra por letra
function sacarTildes(texto) {
  let resultado = "";
  for (const letra of texto) {
    switch (letra) {
      case "á":
        resultado = resultado + "a";
        break;
      case "é":
        resultado = resultado + "e";
        break;
      case "í":
        resultado = resultado + "i";
        break;
      case "ó":
        resultado = resultado + "o";
        break;
      case "ú":
      case "ü":
        resultado = resultado + "u";
        break;
      default:
        resultado = resultado + letra;
    }
  }
  return resultado;
}

// Prepara un texto para el buscador: lo pasa a minúsculas, deja un solo espacio
// entre palabras y le saca las tildes (así "malvon" encuentra "Malvón").
export function normalizarTexto(texto) {
  // split separa por espacios; filter saca los pedazos vacíos que dejan los espacios de más
  const palabras = texto.toLowerCase().split(" ").filter((parte) => parte !== "");
  return sacarTildes(palabras.join(" "));
}

// Devuelve la clase de color de cada etiqueta de producto.
// Las clases bg-terracota, bg-verde y bg-amarillo están en src/index.css
export function claseEtiqueta(etiqueta) {
  switch (etiqueta) {
    case "Oferta":
      return "bg-terracota";
    case "Nuevo":
      return "bg-verde";
    case "Más vendido":
      return "bg-amarillo";
    default:
      return "bg-secondary";
  }
}
