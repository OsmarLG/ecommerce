document.addEventListener("DOMContentLoaded", () => {
    const mostrarProductos = document.getElementById("products-box")

    let carritoDeCompra = [];

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
                        <button   

                        class="add-to-cart"
                        data-id = ${producto.id}
                        data-image = ${producto.image}
                        data-nombre = ${producto.nombre}
                        data-precio = ${producto.precio}
                        >Comprar</button>
                    </div>
                </div>
                
                <div class="cost">
                    $${producto.precio}
                </div>
        `
        mostrarProductos.appendChild(crearDiv)
    });

    const botonesComprar = document.querySelectorAll(".add-to-cart");
    botonesComprar.forEach(boton => {
        boton.addEventListener("click", (e) => {
             const productoId = e.target.getAttribute("data-id");
             const productoImage = e.target.getAttribute("data-image");
             const productoNombre = e.target.getAttribute("data-nombre");
             const productoPrecio = e.target.getAttribute("data-precio")
            
             const productoExistente = carritoDeCompra.find(item => 
              item.id === productoId
             )

             if (productoExistente) {
                productoExistente.cantidad++
             } else {
                const nuevoProducto = {
                    id:productoId, 
                    nombre: productoNombre,
                    image: productoImage,
                    precio: productoPrecio,
                    cantidad: 1
                 };
                 carritoDeCompra = [...carritoDeCompra, nuevoProducto]
             }

             console.log(carritoDeCompra)
        })
    })




})