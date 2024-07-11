document.addEventListener("DOMContentLoaded", () => {
    const mostrarProductos = document.getElementById("products-box")

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
                        <button  class="add-to-cart">Comprar</button>
                    </div>
                </div>
                
                <div class="cost">
                    $${producto.precio}
                </div>
        `
        mostrarProductos.appendChild(crearDiv)
    })
})