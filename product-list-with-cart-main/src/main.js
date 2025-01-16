let isCartEmpty = true;
const cart = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let productos = [];
let cantProductos = 0;
let cantProductosEl= document.getElementById("cant-productos");

fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    productos = data;
  })
  .catch(error => console.error('Error al cargar los datos:', error));



function addProduct(id){
    //Cambios generales
    cart[id-1] ++;
    cantProductos ++;

    //Obteniendo html
    cantProductosEl.innerText = cantProductos;
    const producto = document.getElementById(id);
    const button =producto.querySelector('button.add-cart');

    //Cambiando el boton de add to cart
    button.removeAttribute('onclick');
    button.classList.add('bg-realRed');
    button.innerHTML = `
        <button class="decrement border border-white text-white rounded-full w-6 h-6 font-bold" onclick="decrement(${id})">-</button>
        <span class="quantity text-white font-bold mx-6">1</span>
        <button class="increment border border-white text-white rounded-full w-6 h-6 font-bold" onclick="increment(${id})">+</button>
    `;

    //Cambiando el carrito
    addToCart(id);
}

function addToCart(id){
    const postre = productos[(id -1)];
    const cartContainer = document.querySelector('#cart');

    if (isCartEmpty === true){
        isCartEmpty = false;
        let emptyCartEl = document.getElementById("empty-cart");
        cartContainer.removeChild(emptyCartEl);
    }

    const productDiv = document.createElement('div');
    productDiv.className = 'product-in-cart';
    productDiv.setAttribute('data-id', id);
    
    // Generar el contenido del producto
    productDiv.innerHTML = `
        <div>
        <p class="name">${postre.name}</p>
        <p class="dessert">
            <span class="price">x1</span> @$${postre.price.toFixed(2)} 
            <span class="font-semibold"> $${(postre.price * 1).toFixed(2)}</span>
        </p>
        </div>
        <span class="borrar-prod" onclick="removeFromCart(${id})">x</span>
    `;
    
    // Agregar el producto al carrito
    cartContainer.appendChild(productDiv);
}

function decrement(id){
    const producto = document.getElementById(id);
    const cantidadEl = producto.querySelector('.quantity');
    const cantidad = cantidadEl.innerText 
    if (cantidad == 1){
        resetButton(id)
    } else {
        cantidadEl.innerText = cantidad - 1;
    }

    cantProductos --;
    cantProductosEl.innerText = cantProductos;

    if (cantProductos === 0){
        carritoVacio();
    }
}

function increment(id){
    const producto = document.getElementById(id);
    const cantidadEl = producto.querySelector('.quantity');
    let cantidad = cantidadEl.innerText;
    cantidad ++;
    cantidadEl.innerText = cantidad;
    cantProductos ++;
    cantProductosEl.innerText = cantProductos;
    addToCart(id);
}

function resetButton(productId) {
    const producto = document.getElementById(productId);
    const button = producto.querySelector('button');
    button.className = 'add-cart';
    button.innerHTML = `
        <img src="./assets/images/icon-add-to-cart.svg" alt="">
        Add to cart
    `;
}
 
function carritoVacio(){
    isCartEmpty = true;
    const cartContainer = document.querySelector('#cart');
    cartContainer.innerHTML = '';
    
    // Agrega el mensaje de carrito vacío
    cartContainer.innerHTML = `
        <h3 class="text-realRed font-bold text-lg lg:text-2xl mb-3"> Your Cart ( <span id="cant-productos">0</span> )</h3>
        <div id="empty-cart">
        <img src="./assets/images/illustration-empty-cart.svg" alt="" class="mx-auto">
        <p class="text-sm text-center lg:mt-2 lg:text-base">Your added items will appear here</p>
        </div>
    `;      
    cantProductosEl = document.getElementById("cant-productos");
}