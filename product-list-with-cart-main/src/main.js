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
    //Getting the needed html
    const postre = productos[(id -1)];
    const cartContainer = document.querySelector('#cart');

    //Removing empty cart style
    if (isCartEmpty === true){
        isCartEmpty = false;
        let emptyCartEl = document.getElementById("empty-cart");
        cartContainer.removeChild(emptyCartEl);
    }

    //Creating the product for the cart
    const productDiv = document.createElement('div');
    productDiv.className = 'product-in-cart';
    productDiv.setAttribute('data-id', id);
    
    productDiv.innerHTML = `
        <div>
        <p class="name">${postre.name}</p>
        <p class="dessert">
            <span class="price quantity-of-${id}">x1</span> @$${postre.price.toFixed(2)} 
            <span class="font-semibold ml-2 price-of-${id}"> $${postre.price.toFixed(2)}</span>
        </p>
        </div>
        <span class="borrar-prod" onclick="removeFromCart(${id})">x</span>
    `;
    
    // Adding the product
    cartContainer.appendChild(productDiv);
}

function decrement(id){
    cart[id -1] --;
    const producto = document.getElementById(id);
    const cantidadEl = producto.querySelector('.quantity');
    const cantidad = cantidadEl.innerText 
    if (cantidad == 1){
        removeFromCart(id)
    } else {
        cantidadEl.innerText = cantidad - 1;
    }

    cantProductos --;
    cantProductosEl.innerText = cantProductos;

    if (cantProductos === 0){
        carritoVacio();
    }

    //Decrementing Cart
    const cartContainer = document.querySelector('#cart');
    const cantidadEnCarritoEl = cartContainer.querySelector('.quantity-of-' + id);
    cantidadEnCarritoEl.innerText = "x" + cart[id-1];
    const precioSubtotalEl = cartContainer.querySelector('.price-of-' + id);
    precioSubtotalEl.innerText = "$" + (productos[(id - 1)].price * cart[id-1]).toFixed(2);
}

function increment(id){
    cart[id-1] ++;
    cantProductos ++;

    //Changing html
    const producto = document.getElementById(id);
    const cantidadEl = producto.querySelector('.quantity');
    let cantidad = cantidadEl.innerText;
    cantidad ++;
    cantidadEl.innerText = cantidad;
    cantProductosEl.innerText = cantProductos;

    //Incrementing Cart
    const cartContainer = document.querySelector('#cart');
    const cantidadEnCarritoEl = cartContainer.querySelector('.quantity-of-' + id);
    cantidadEnCarritoEl.innerText = "x" + cart[id-1];
    const precioSubtotalEl = cartContainer.querySelector('.price-of-' + id);
    precioSubtotalEl.innerText = "$" + (productos[(id - 1)].price  * cart[id-1]).toFixed(2);
}

function removeFromCart(id){
    cantProductos -= cart[id-1];
    cantProductosEl.innerText = cantProductos;
    cart[id-1] = 0;
    if (cantProductos === 0){
        carritoVacio();
    }
    resetButton(id);
    
    //Removing from cart html
    const cartContainer = document.querySelector('#cart');
    const productToRemove= cartContainer.querySelector(`.product-in-cart[data-id="${id}"]`);
    cartContainer.removeChild(productToRemove);
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