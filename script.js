document.addEventListener("DOMContentLoaded", () => {
    const mostrarProductos = document.getElementById("products-box");
    const mostrarProductoAlCarrito = document.getElementById("cart");
    const mostrarTotalDelProducto = document.getElementById("total-amount");
    const contadorCarrito = document.getElementById("cart-counter")


    const carritoDropdown = document.getElementById("cart-dropdown")
    const carritoIcon = document.querySelector(".cart-icon-container")
    
 
    let carritoDeCompra = [];

    const actualizarCarrito = () => {
        mostrarProductoAlCarrito.innerHTML = "";
        let total = 0;
        let cantidadTotal = 0;

        carritoDeCompra.forEach(producto => {
            total += producto.precio * producto.cantidad;
            cantidadTotal = cantidadTotal + producto.cantidad
        
            const articuloAlCarrito = document.createElement("div");
            articuloAlCarrito.classList.add("cart-item");
            articuloAlCarrito.innerHTML = `
                <img src="${producto.image}" alt="">
                <div class="info">
                    <p>${producto.nombre}</p>
                    <div>
                        <button class="decrease-quantity" data-id="${producto.id}">-</button>
                        <span>${producto.cantidad}</span>
                        <button class="increase-quantity" data-id="${producto.id}">+</button>
                    </div>
                    <p>${(producto.precio * producto.cantidad).toFixed(2)}</p>
                    <button class="remove-item" data-id="${producto.id}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            mostrarProductoAlCarrito.appendChild(articuloAlCarrito);
        });

        mostrarTotalDelProducto.textContent = total.toFixed(2);
        contadorCarrito.textContent = cantidadTotal;

        //llamar la funcion configurarEventos
        
    };

//funcion para los botones 


  
    //funcion para mostrar los productos
    productos.forEach(producto => {
        const crearDiv = document.createElement("div");
        crearDiv.classList.add("products");
        crearDiv.innerHTML = `
            <img src="${producto.image}" alt="">
            <div class="details">
                <span>${producto.categoria}</span>
                <h6>${producto.nombre}</h6>
                <div class="star">
                    ${'<i class="fas fa-star"></i>'.repeat(producto.estrellas)}
                    <span>${producto.opinion}</span>
                    <button class="add-to-cart" data-id="${producto.id}" data-image="${producto.image}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">
                        Comprar
                    </button>
                </div>
            </div>
            <div class="cost">$${producto.precio}</div>
        `;
        mostrarProductos.appendChild(crearDiv);
    });


    
    //funcion para agregar productos al carrito
    document.querySelectorAll(".add-to-cart").forEach(boton => {
        boton.addEventListener("click", (e) => {
            const productoId = parseInt(e.target.getAttribute("data-id"));
            const productoImage = e.target.getAttribute("data-image");
            const productoNombre = e.target.getAttribute("data-nombre");
            const productoPrecio = parseFloat(e.target.getAttribute("data-precio"));

            const productoExistente = carritoDeCompra.find(item => item.id === productoId);

            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                const nuevoProducto = {
                    id: productoId,
                    nombre: productoNombre,
                    image: productoImage,
                    precio: productoPrecio,
                    cantidad: 1
                };
                carritoDeCompra = [...carritoDeCompra, nuevoProducto];
            }
            actualizarCarrito();
        });
    });


    //funcion para mostrar y ocultar el carrito de compra 
      carritoIcon.addEventListener("click", () => {
        carritoDropdown.classList.toggle("hidden")
      })
});