        // Datos de productos (simulados)
        const productos = [
            {
                id: 1,
                nombre: "iPhone 13 Pro",
                categoria: "Smartphone",
                image: "/images/p1.jpg",
                precio: 999.99,
                estrellas: 5,
                opinion: "(128 opiniones)"
            },
            {
                id: 2,
                nombre: "Samsung Galaxy S21",
                categoria: "Smartphone",
                image: "/images/p2.jpg",
                precio: 849.99,
                estrellas: 4,
                opinion: "(96 opiniones)"
            },
            {
                id: 3,
                nombre: "Audífonos Sony WH-1000XM4",
                categoria: "Audio",
                image: "/images/p3.jpg",
                precio: 349.99,
                estrellas: 5,
                opinion: "(202 opiniones)"
            },
            {
                id: 4,
                nombre: "iPad Pro 2022",
                categoria: "Tablet",
                image: "/images/p4.jpg",
                precio: 1099.99,
                estrellas: 5,
                opinion: "(87 opiniones)"
            },
            {
                id: 5,
                nombre: "MacBook Air M2",
                categoria: "Laptop",
                image: "/images/p5.jpg",
                precio: 1199.99,
                estrellas: 5,
                opinion: "(145 opiniones)"
            },
            {
                id: 6,
                nombre: "Apple Watch Series 7",
                categoria: "Wearable",
                image: "/images/p6.jpg",
                precio: 399.99,
                estrellas: 4,
                opinion: "(178 opiniones)"
            }
        ];

        document.addEventListener("DOMContentLoaded", () => {
            const mostrarProductos = document.getElementById("products-box");
            const mostrarProductoAlCarrito = document.getElementById("cart");
            const mostrarTotalDelProducto = document.getElementById("total-amount");
            const contadorCarrito = document.getElementById("cart-counter");
            const carritoDropdown = document.getElementById("cart-dropdown");
            const carritoIcon = document.getElementById("cart-icon");
            const closeCartBtn = document.getElementById("close-cart");
            const overlay = document.getElementById("overlay");
         
            let carritoDeCompra = [];

            const actualizarCarrito = () => {
                mostrarProductoAlCarrito.innerHTML = "";
                let total = 0;
                let cantidadTotal = 0;

                if (carritoDeCompra.length === 0) {
                    mostrarProductoAlCarrito.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
                } else {
                    carritoDeCompra.forEach(producto => {
                        total += producto.precio * producto.cantidad;
                        cantidadTotal = cantidadTotal + producto.cantidad;
                    
                        const articuloAlCarrito = document.createElement("div");
                        articuloAlCarrito.classList.add("cart-item");
                        articuloAlCarrito.innerHTML = `
                            <img src="${producto.image}" alt="${producto.nombre}">
                            <div class="info">
                                <p>${producto.nombre}</p>
                                <div>
                                    <button class="decrease-quantity" data-id="${producto.id}">-</button>
                                    <span>${producto.cantidad}</span>
                                    <button class="increase-quantity" data-id="${producto.id}">+</button>
                                </div>
                                <p>$${(producto.precio * producto.cantidad).toFixed(2)}</p>
                                <button class="remove-btn remove-item" data-id="${producto.id}">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        `;
                        mostrarProductoAlCarrito.appendChild(articuloAlCarrito);
                    });
                }

                mostrarTotalDelProducto.textContent = total.toFixed(2);
                contadorCarrito.textContent = cantidadTotal;

                // Configurar eventos para los botones del carrito
                configurarEventos();
            };

            // Función para los botones del carrito
            const configurarEventos = () => {
                document.querySelectorAll(".increase-quantity").forEach(button => {
                    button.addEventListener("click", () => {
                         const idboton = parseInt(button.getAttribute("data-id"));
                         carritoDeCompra = carritoDeCompra.map(producto => {
                            if (producto.id === idboton) {
                                return {
                                    ...producto,
                                    cantidad: producto.cantidad + 1
                                };
                            }
                            return producto;
                         });
                         actualizarCarrito();
                    });
                });

                // Función para disminuir cantidad del producto 
                document.querySelectorAll(".decrease-quantity").forEach(button  => {
                    button.addEventListener("click", ()  => {
                         const idboton = parseInt(button.getAttribute("data-id"));
                        carritoDeCompra = carritoDeCompra.map(producto => {
                            if (producto.id === idboton && producto.cantidad > 1) {
                                return {
                                    ...producto,
                                    cantidad: producto.cantidad - 1
                                };
                            }
                            return producto;
                        });
                        actualizarCarrito();
                    });
                });

                // Función para eliminar producto en el carrito
                document.querySelectorAll(".remove-item").forEach(button  => {
                    button.addEventListener("click", ()  => {
                         const idboton = parseInt(button.getAttribute("data-id"));
                         carritoDeCompra = carritoDeCompra.filter(producto => {
                            return producto.id !== idboton;
                         });
                         actualizarCarrito();
                    });
                });
            };

            // Función para mostrar los productos
            productos.forEach(producto => {
                const crearDiv = document.createElement("div");
                crearDiv.classList.add("products");
                crearDiv.innerHTML = `
                    <img src="${producto.image}" alt="${producto.nombre}">
                    <div class="details">
                        <span>${producto.categoria}</span>
                        <h6>${producto.nombre}</h6>
                        <div class="star">
                            ${'<i class="fas fa-star"></i>'.repeat(producto.estrellas)}
                            <span>${producto.opinion}</span>
                        </div>
                        <button class="add-to-cart" data-id="${producto.id}" data-image="${producto.image}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">
                            Comprar
                        </button>
                    </div>
                    <div class="cost">$${producto.precio}</div>
                `;
                mostrarProductos.appendChild(crearDiv);
            });

            // Función para agregar productos al carrito
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
                    
                    // Mostrar el carrito al agregar un producto
                    carritoDropdown.classList.add("active");
                    overlay.classList.add("active");
                });
            });

            // Función para mostrar y ocultar el carrito de compra
            carritoIcon.addEventListener("click", () => {
                carritoDropdown.classList.add("active");
                overlay.classList.add("active");
            });

            closeCartBtn.addEventListener("click", () => {
                carritoDropdown.classList.remove("active");
                overlay.classList.remove("active");
            });
            
            overlay.addEventListener("click", () => {
                carritoDropdown.classList.remove("active");
                overlay.classList.remove("active");
            });

            // Botón de WhatsApp
            const whatsappBtn = document.getElementById("whatsappBtn");
            whatsappBtn.addEventListener("click", () => {
                if (carritoDeCompra.length === 0) {
                    alert("Tu carrito está vacío. Agrega productos antes de realizar un pedido.");
                    return;
                }
                
                let mensaje = "Hola, quiero comprar los siguientes productos:\n\n";
                
                carritoDeCompra.forEach(producto => {
                    mensaje += `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${(producto.precio * producto.cantidad).toFixed(2)}\n`;
                });
                
                mensaje += `\nTotal: $${mostrarTotalDelProducto.textContent}`;
                
                const url = `https://api.whatsapp.com/send?phone=526151559659&text=${encodeURIComponent(mensaje)}`;
                
                window.open(url, '_blank');
            });

            // Inicializar carrito vacío
            actualizarCarrito();
        });