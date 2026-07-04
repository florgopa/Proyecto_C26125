// --- Categorías de la API ---
const categorias = ["mobile-accessories", "smartphones", "laptops", "tablets"];

// --- Referencias al DOM ---
const catalogo = document.getElementById("catalogo");
const mensajeCarga = document.getElementById("mensaje-carga");
const destacados = document.getElementById("destacados");
const listaResenas = document.getElementById("lista-resenas");


// TRAER PRODUCTOS DE LA API
async function obtenerProductos() {
  try {
    let productos = [];

    // Pedimos productos de cada categoría y los juntamos
    for (let i = 0; i < categorias.length; i++) {
      const respuesta = await fetch(`https://dummyjson.com/products/category/${categorias[i]}`);
      const datos = await respuesta.json();
      productos = productos.concat(datos.products);
    }

    mostrarProductos(productos);

  } catch (error) {
    mensajeCarga.textContent = "Hubo un error al cargar los productos. Intentá de nuevo más tarde.";
    console.log("Error al obtener productos:", error);
  }
}

// MOSTRAR PRODUCTOS EN PANTALLA
function mostrarProductos(productos) {
  mensajeCarga.style.display = "none";

  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];

    const card = document.createElement("article");
    card.classList.add("card-producto");

    card.innerHTML = `
      <img src="${producto.thumbnail}" alt="${producto.title}" />
      <h3>${producto.title}</h3>
      <p>${producto.description.substring(0, 80)}...</p>
      <p class="precio">$${producto.price}</p>
      <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
    `;

    catalogo.appendChild(card);
  }

  // Una vez creadas las cards, activamos los botones
  activarBotonesAgregar(productos);
}

// VALIDACIÓN DEL FORMULARIO DE CONTACTO
const formContacto = document.getElementById("form-contacto");

if (formContacto) {
  formContacto.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");

    const errorNombre = document.getElementById("error-nombre");
    const errorEmail = document.getElementById("error-email");
    const errorMensaje = document.getElementById("error-mensaje");
    const exitoContacto = document.getElementById("exito-contacto");

    // Limpiamos errores anteriores
    errorNombre.textContent = "";
    errorEmail.textContent = "";
    errorMensaje.textContent = "";
    exitoContacto.textContent = "";
    nombre.classList.remove("input-error");
    email.classList.remove("input-error");
    mensaje.classList.remove("input-error");

    let valido = true;

    // Validar nombre
    if (nombre.value.trim() === "") {
      errorNombre.textContent = "Por favor ingresá tu nombre.";
      nombre.classList.add("input-error");
      valido = false;
    }

    // Validar email con expresión regular
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === "") {
      errorEmail.textContent = "Por favor ingresá tu correo electrónico.";
      email.classList.add("input-error");
      valido = false;
    } else if (!formatoEmail.test(email.value.trim())) {
      errorEmail.textContent = "El formato del correo no es válido.";
      email.classList.add("input-error");
      valido = false;
    }

    // Validar mensaje
    if (mensaje.value.trim() === "") {
      errorMensaje.textContent = "Por favor escribí tu mensaje.";
      mensaje.classList.add("input-error");
      valido = false;
    }

    // Si todo está bien, enviamos
    if (valido) {
      exitoContacto.textContent = "¡Mensaje enviado! Te respondemos a la brevedad 🌸";
      formContacto.reset();
    }
  });
}

// PANEL LATERAL DEL CARRITO
const botonAbrirCarrito = document.getElementById("abrir-carrito");
const botonCerrarCarrito = document.getElementById("cerrar-carrito");
const panelCarrito = document.getElementById("panel-carrito");
const fondoCarrito = document.getElementById("fondo-carrito");
const panelItems = document.getElementById("panel-carrito-items");
const panelTotal = document.getElementById("panel-carrito-total");

function abrirPanelCarrito() {
  renderizarPanelCarrito();
  panelCarrito.classList.add("activo");
  fondoCarrito.classList.add("activo");
}

function cerrarPanelCarrito() {
  panelCarrito.classList.remove("activo");
  fondoCarrito.classList.remove("activo");
}

if (botonAbrirCarrito) {
  botonAbrirCarrito.addEventListener("click", abrirPanelCarrito);
}

if (botonCerrarCarrito) {
  botonCerrarCarrito.addEventListener("click", cerrarPanelCarrito);
}

if (fondoCarrito) {
  fondoCarrito.addEventListener("click", cerrarPanelCarrito);
}

function renderizarPanelCarrito() {
  const carrito = obtenerCarrito();
  panelItems.innerHTML = "";

  if (carrito.length === 0) {
    panelItems.innerHTML = `<p class="carrito-vacio-mensaje">Tu carrito está vacío 🌸</p>`;
    panelTotal.textContent = "$0";
    return;
  }

  let total = 0;

  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];
    const subtotal = item.price * item.cantidad;
    total += subtotal;

    const div = document.createElement("div");
    div.classList.add("panel-item");
    div.innerHTML = `
      <img src="${item.thumbnail}" alt="${item.title}" />
      <div class="panel-item-info">
        <h4>${item.title}</h4>
        <p class="panel-item-cantidad">Cantidad: ${item.cantidad}</p>
        <p>$${subtotal}</p>
      </div>
    `;

    panelItems.appendChild(div);
  }

  panelTotal.textContent = "$" + total;
}


// CARRITO — AGREGAR PRODUCTOS
function activarBotonesAgregar(productos) {
  const botones = document.querySelectorAll(".btn-agregar");

  botones.forEach(function (boton) {
    boton.addEventListener("click", function () {
      const id = boton.getAttribute("data-id");
      const producto = productos.find(function (p) {
        return p.id == id;
      });

      agregarAlCarrito(producto);
    });
  });
}

function agregarAlCarrito(producto) {
  let carrito = obtenerCarrito();

  // Buscamos si el producto ya está en el carrito
  const existente = carrito.find(function (item) {
    return item.id == producto.id;
  });

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      title: producto.title,
      price: producto.price,
      thumbnail: producto.thumbnail,
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
  actualizarContador();
  abrirPanelCarrito();
}


// PRODUCTOS DESTACADOS (index.html)
async function obtenerDestacados() {
  try {
    let productos = [];

    for (let i = 0; i < categorias.length; i++) {
      const respuesta = await fetch(`https://dummyjson.com/products/category/${categorias[i]}`);
      const datos = await respuesta.json();
      productos = productos.concat(datos.products);
    }

    // Mezclamos el array al azar
    const productosRandom = productos.sort(function () {
      return 0.5 - Math.random();
    });

    // Tomamos solo los primeros 3
    const tresDestacados = productosRandom.slice(0, 3);

    mostrarDestacados(tresDestacados);

    // Si la página tiene sección de reseñas, las armamos también
    if (listaResenas) {
      mostrarResenas(productos);
    }

  } catch (error) {
    console.log("Error al obtener destacados:", error);
  }
}

// RESEÑAS
function mostrarResenas(productos) {
  // Juntamos todas las reviews de todos los productos en un solo array
  let todasLasReviews = [];

  for (let i = 0; i < productos.length; i++) {
    if (productos[i].reviews) {
      todasLasReviews = todasLasReviews.concat(productos[i].reviews);
    }
  }

  // Mezclamos al azar y tomamos 3
  const reviewsRandom = todasLasReviews.sort(function () {
    return 0.5 - Math.random();
  });

  const tresReviews = reviewsRandom.slice(0, 3);

  for (let i = 0; i < tresReviews.length; i++) {
    const review = tresReviews[i];

    const card = document.createElement("section");
    card.classList.add("card-resena");
    card.innerHTML = `
      <p class="estrellas">${"⭐".repeat(Math.round(review.rating))}</p>
      <p>"${review.comment}"</p>
      <p><strong>— ${review.reviewerName}</strong></p>
    `;

    listaResenas.appendChild(card);
  }
}

function mostrarDestacados(productos) {
  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];

    const card = document.createElement("article");
    card.classList.add("card-producto");

    card.innerHTML = `
      <img src="${producto.thumbnail}" alt="${producto.title}" />
      <h3>${producto.title}</h3>
      <p>${producto.description.substring(0, 70)}...</p>
      <p class="precio">$${producto.price}</p>
      <a href="tienda.html">Ver más</a>
    `;

    destacados.appendChild(card);
  }
}

// PÁGINA CARRITO COMPLETA (carrito.html)
const listaCarrito = document.getElementById("lista-carrito");
const totalCarritoEl = document.getElementById("total-carrito");
const botonFinalizar = document.getElementById("finalizar-compra");
const mensajeCompra = document.getElementById("mensaje-compra");

function renderizarPaginaCarrito() {
  const carrito = obtenerCarrito();
  listaCarrito.innerHTML = "";

  if (carrito.length === 0) {
    listaCarrito.innerHTML = `
      <div class="carrito-vacio-pagina">
        <p>Tu carrito está vacío 🌸</p>
        <a href="tienda.html">Ir a la tienda</a>
      </div>
    `;
    totalCarritoEl.textContent = "$0";
    return;
  }

  let total = 0;

  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];
    const subtotal = item.price * item.cantidad;
    total += subtotal;

    const div = document.createElement("div");
    div.classList.add("item-carrito");
    div.innerHTML = `
      <img src="${item.thumbnail}" alt="${item.title}" />
      <div class="item-carrito-info">
        <h4>${item.title}</h4>
        <p>$${item.price}</p>
      </div>
      <div class="item-carrito-cantidad">
        <button class="btn-cantidad btn-restar" data-id="${item.id}">−</button>
        <span class="cantidad-numero">${item.cantidad}</span>
        <button class="btn-cantidad btn-sumar" data-id="${item.id}">+</button>
      </div>
      <p class="item-carrito-subtotal">$${subtotal}</p>
      <button class="btn-eliminar" data-id="${item.id}" aria-label="Eliminar producto">🗑️</button>
    `;

    listaCarrito.appendChild(div);
  }

  totalCarritoEl.textContent = "$" + total;

  activarBotonesCarrito();
}

function activarBotonesCarrito() {
  const botonesSumar = document.querySelectorAll(".btn-sumar");
  const botonesRestar = document.querySelectorAll(".btn-restar");
  const botonesEliminar = document.querySelectorAll(".btn-eliminar");

  botonesSumar.forEach(function (boton) {
    boton.addEventListener("click", function () {
      cambiarCantidad(boton.getAttribute("data-id"), 1);
    });
  });

  botonesRestar.forEach(function (boton) {
    boton.addEventListener("click", function () {
      cambiarCantidad(boton.getAttribute("data-id"), -1);
    });
  });

  botonesEliminar.forEach(function (boton) {
    boton.addEventListener("click", function () {
      eliminarDelCarrito(boton.getAttribute("data-id"));
    });
  });
}

function cambiarCantidad(id, cambio) {
  let carrito = obtenerCarrito();
  const item = carrito.find(function (p) {
    return p.id == id;
  });

  if (!item) return;

  item.cantidad += cambio;

  // Si llega a 0, lo eliminamos del carrito
  if (item.cantidad <= 0) {
    carrito = carrito.filter(function (p) {
      return p.id != id;
    });
  }

  guardarCarrito(carrito);
  actualizarContador();
  renderizarPaginaCarrito();
}

function eliminarDelCarrito(id) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(function (p) {
    return p.id != id;
  });

  guardarCarrito(carrito);
  actualizarContador();
  renderizarPaginaCarrito();
}

if (botonFinalizar) {
  botonFinalizar.addEventListener("click", function () {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
      mensajeCompra.textContent = "Tu carrito está vacío.";
      return;
    }

    guardarCarrito([]);
    actualizarContador();
    renderizarPaginaCarrito();
    mensajeCompra.textContent = "¡Gracias por tu compra! 🌸 Te enviamos un correo con los detalles.";
  });
}

// LOCALSTORAGE — FUNCIONES AUXILIARES
function obtenerCarrito() {
  const datos = localStorage.getItem("carritoGopaTech");
  return datos ? JSON.parse(datos) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carritoGopaTech", JSON.stringify(carrito));
}

// CONTADOR DEL CARRITO (nav)
function actualizarContador() {
  const contador = document.getElementById("contador-carrito");
  if (!contador) return;

  const carrito = obtenerCarrito();
  const totalItems = carrito.reduce(function (total, item) {
    return total + item.cantidad;
  }, 0);

  contador.textContent = "(" + totalItems + ")";
}

// INICIO
actualizarContador();

// Solo buscamos productos si estamos en la página de la tienda
if (catalogo) {
  obtenerProductos();
}

// Solo buscamos destacados si estamos en el index
if (destacados || listaResenas) {
  obtenerDestacados();
}

// Solo renderizamos la página de carrito si existe ese contenedor
if (listaCarrito) {
  renderizarPaginaCarrito();
}