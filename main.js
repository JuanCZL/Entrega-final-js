const productos = [
    {id:1, nombre:"GalakCake", precio:5500, tamaño:"Pequeña(8 porc.)", imagen:"./img/torta-galak.jpg"},
    {id:2, nombre:"GolfeadoCake", precio:5000, tamaño:"Pequeña(8 porc.)", imagen:"./img/torta-golfeados.jpg"},
    {id:3, nombre:"MilhojasCake", precio:6500, tamaño:"Pequeña(8 porc.)", imagen:"./img/torta-milhojas.jpg"},
    {id:4, nombre:"GalakCake", precio:6300, tamaño:"Mediana(12 porc.)", imagen:"./img/torta-galak.jpg"},
    {id:5, nombre:"GolfeadosCake", precio:6000, tamaño:"Mediana(12 porc.)", imagen:"./img/torta-golfeados.jpg"},
    {id:6, nombre:"MilhojasCake", precio:7500, tamaño:"Mediana(12 porc.)", imagen:"./img/torta-milhojas.jpg"},
    {id:7, nombre:"GalakCake", precio:7300, tamaño:"Grande(18 porc.)", imagen:"./img/torta-galak.jpg"},
    {id:8, nombre:"GolfeadosCake", precio:7000, tamaño:"Grande(18 porc.)", imagen:"./img/torta-golfeados.jpg"},
    {id:9, nombre:"MilhojasCake", precio:8500, tamaño:"Grande(18 porc.)", imagen:"./img/torta-milhojas.jpg"},
];

const contenedorProductos = document.querySelector("#contenedor-productos");
let botonesAgregar = document.querySelectorAll(".btn-a");
let numerito = document.querySelector("#numerito");

function cargarProductos(){

    productos.forEach(producto => {
    let div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img class="galak" src="${producto.imagen}" alt="${producto.nombre}">
        <h1 class="producto-nombre">${producto.nombre}</h1>
        <p class="producto-tamaño">${producto.tamaño}</p>
        <p class="producto-precio">$${producto.precio}</p>
        <div class="botones-galak"> 
            <button class="btn-a" type="button" id="${producto.id}">Agregar</button>
        </div>
        `;
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos();

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".btn-a");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id == idBoton);

    if (productosEnCarrito.some(producto => producto.id == idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id ==idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}