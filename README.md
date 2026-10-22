# Brote Vivero Online 🌱

## Descripción

Brote es un vivero ficticio de Hurlingham que vende plantas de interior y exterior, suculentas, macetas y accesorios. En la aplicación se puede recorrer el catálogo, buscar y filtrar productos, ver el detalle de cada uno, armar un carrito de compras y completar los datos para simular una compra.

### Funcionalidades principales

- Página de inicio con identidad visual de Brote Vivero Online, logo, carrusel y acceso al catálogo.
- Catálogo con más de 12 productos cargados desde un array de objetos.
- Búsqueda por nombre y filtros por categoría y disponibilidad de stock.
- Ordenamiento por precio y nombre.
- Vista de detalle para cada producto mediante rutas dinámicas.
- Carrito centralizado en `src/App.jsx`.
- Agregar, eliminar, aumentar y disminuir cantidades.
- Control de stock para evitar superar las unidades disponibles.
- Cálculo de subtotal por producto, cantidad total de artículos y total general.
- Persistencia del carrito mediante `localStorage`.
- Formulario controlado para finalizar una compra simulada.
- Validación de campos obligatorios y pantalla de confirmación.
- Diseño responsive para celular, tablet y escritorio.

## Tecnologías utilizadas

- **React 19**: construcción de la interfaz mediante componentes funcionales.
- **JavaScript ES6+**: lógica de la aplicación, arrays, objetos y funciones.
- **React Router DOM**: navegación entre páginas y rutas dinámicas.
- **React-Bootstrap**: componentes visuales, grillas y diseño responsive.
- **Bootstrap 5**: estilos y utilidades de diseño.
- **CSS Modules**: estilos encapsulados por componente.
- **CSS global**: identidad visual, colores, tipografías y estilos generales.
- **Vite**: servidor de desarrollo y herramienta de compilación.
- **ESLint**: revisión de calidad y posibles errores del código.
- **localStorage**: persistencia del carrito en el navegador.

## Estructura principal

```text
src/
├── components/
│   ├── CarritoItem.jsx
│   ├── FormularioCompra.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Navbar.jsx
│   └── ProductoCard.jsx
├── data/
│   └── productos.js
├── pages/
│   ├── Carrito.jsx
│   ├── DetalleProducto.jsx
│   ├── FinalizarCompra.jsx
│   ├── Inicio.jsx
│   └── Productos.jsx
├── utils/
│   └── formato.js
├── App.jsx
├── index.css
└── main.jsx
```

## Instalación

### Requisitos previos

- [Node.js](https://nodejs.org/) en su versión LTS.
- npm, incluido con Node.js.
- Visual Studio Code, recomendado para editar y ejecutar el proyecto.
- Git, si se desea clonar el repositorio.

### Clonar el repositorio

```bash
git clone https://github.com/Thomas-unahur/brote-vivero-online.git
cd brote-vivero-online
```

Si el proyecto ya está descargado, simplemente abrir la carpeta raíz en Visual Studio
Code. La carpeta correcta es la que contiene `package.json`.

### Instalar dependencias

Desde la terminal integrada de Visual Studio Code ejecutar:

```bash
npm install
```

Este comando instala React, React Router DOM, Bootstrap, React-Bootstrap, Vite y las
herramientas de desarrollo indicadas en `package.json`.

## Ejecutar el proyecto

### Servidor de desarrollo

```bash
npm run dev
```

Vite mostrará una dirección local, normalmente:

```text
http://localhost:5173
```

Abrir esa dirección en el navegador. Para detener el servidor, presionar `Ctrl + C`
en la terminal.

### Verificar el código

```bash
npm run lint
```

### Generar la versión de producción

```bash
npm run build
```

### Previsualizar la versión compilada

```bash
npm run preview
```

## Cómo probar las funcionalidades

1. Ingresar a la página de inicio y comprobar que el menú permite navegar.
2. Entrar a **Productos** y buscar un producto por nombre.
3. Probar el filtro de categoría, el filtro de productos con stock y el ordenamiento.
4. Abrir el detalle de un producto mediante **Ver detalle**.
5. Agregar productos al carrito y verificar que se actualice el contador del menú.
6. Aumentar y disminuir cantidades desde el carrito.
7. Confirmar que cada producto muestre su subtotal y que el resumen muestre el total general.
8. Eliminar un producto y probar la opción **Vaciar carrito**.
9. Recargar la página y verificar que el carrito se conserve mediante `localStorage`.
10. Finalizar una compra, completar los datos obligatorios, revisar el pedido y confirmar.
11. Probar un producto sin stock y comprobar que no se pueda agregar.
12. Reducir el ancho de la ventana o usar las herramientas responsive del navegador.

## Integrantes del grupo

- Ortuzar Thomas.
- Hermida Adrian.
- Carrizo Rocio.
- Gomez Santiago.

## Deploy

No se realizó un deploy público para esta versión. El proyecto puede ejecutarse
localmente con `npm run dev`.
