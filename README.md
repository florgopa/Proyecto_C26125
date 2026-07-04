Gopa Tech — Ecommerce de Accesorios de Escritorio Y Celulares

Sitio web de ecommerce desarrollado con HTML5, CSS3 y JavaScript como proyecto final del curso de Front-End JS de Talento Tech.

¿De qué se trata?

Gopa Tech es una tienda online de accesorios de escritorio: teclados, mousepads, auriculares, lámparas y más. 

Estructura del proyecto

gopa-tech/
├── index.html        → Página principal
├── tienda.html       → Catálogo de productos
├── contacto.html     → Formulario de contacto y ubicación
├── carrito.html      → Carrito de compras completo
├── styles.css        → Estilos generales
├── contacto.css      → Estilos específicos de contacto
├── script.js         → Lógica JavaScript
└── img/              → Imágenes y logo

Tecnologías utilizadas


HTML5 semántico
CSS3 (Flexbox, Grid, Media Queries)
JavaScript (fetch, async/await, DOM, localStorage)
Google Fonts (Nunito + Poppins)
API pública: DummyJSON
Formspree para el formulario de contacto
Google Maps iframe


Funcionalidades


Productos traídos dinámicamente desde la API de DummyJSON (categorías: smartphones, laptops, tablets, mobile-accessories)
Productos destacados random en la página de inicio — cambian en cada visita
Reseñas reales extraídas de la API, también random en cada carga
Carrito de compras con panel lateral deslizante y página completa
Persistencia del carrito con localStorage (se mantiene entre páginas y sesiones)
Contador de productos en el nav actualizado en tiempo real
Edición de cantidades (+/-) y eliminación de productos del carrito
Total dinámico que se recalcula automáticamente
Compra simulada con mensaje de confirmación
Formulario de contacto con validación JavaScript (campos obligatorios y formato de email)
Diseño completamente responsivo


Proceso de construcción

El proyecto arrancó como una pre-entrega con HTML y CSS puro, y fue creciendo hasta convertirse en un ecommerce dinámico completo.

Una de las decisiones más interesantes fue cambiar los productos hardcodeados del HTML por una integración real con la API de DummyJSON. Al principio los productos estaban escritos a mano, pero decidi conectar una API para que el catálogo fuera dinámico y real. Lo que no esperaba era que la misma API ya trae reseñas dentro de cada producto, así que aproveche eso para también dinamizar la sección de opiniones — y me pareció un detalle que le dio más vida al sitio.

La validación del formulario con JavaScript requirió repasar varias veces los conceptos: entender cómo interceptar el submit, cómo recorrer los campos, cómo mostrar errores en el DOM sin usar alert() y cómo manejar el formato del email con una expresión regular. Fue uno de los puntos más desafiantes pero también de los más satisfactorios una vez que funcionó.

El mayor desafío inicial (igual que en la pre-entrega) siguió siendo el lado creativo: la paleta de colores, el nombre de la tienda, el logo. El lado técnico se fue resolviendo con práctica y repaso.

Además me pareció que quedaba inconsistente que el sitio estuviera construido en español y la api trajera datos en inglés por lo que decidí cambiar el idioma del sitio a inglés para que  se corresponda todo el contenido.

Uso de IA

Durante el desarrollo usé IA como asistente para organizar la estructura del proyecto, resolver dudas sobre Media Queries, entender mejor el funcionamiento de fetch y async/await, y pensar la lógica del carrito con localStorage. También fue útil para discutir decisiones de diseño y encontrar la API más adecuada para la temática de la tienda.

Demo

🔗 https://florgopa.github.io/Proyecto_C26125/



Desarrollado para Talento Tech — Front-End JS 2025

