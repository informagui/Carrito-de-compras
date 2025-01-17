let isCartEmpty = true;
const cart = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let productos = [];
let cantProductos = 0;
let cantProductosEl= document.getElementById("cant-productos");
let total = 0.00;

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
    total += productos[(id -1)].price.toFixed(2);
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
    addToTotal(id);
}

function addToCart(id){
    //Getting the needed html
    const postre = productos[(id -1)];
    const cartContainer = document.getElementById('cart');

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
    const producto = document.getElementById(id);
    const cantidadEl = producto.querySelector('.quantity');
    const cantidad = cart[id-1];
    if (cantidad == 1){
        removeFromCart(id)
    } else {
        cantidadEl.innerText = cantidad - 1;
        cart[id -1] --;
        cantProductos --;
        cantProductosEl.innerText = cantProductos;
        total -= productos[(id -1)].price.toFixed(2);

        //Decrementing Cart
        const cartContainer = document.querySelector('#cart');
        const cantidadEnCarritoEl = cartContainer.querySelector('.quantity-of-' + id);
        cantidadEnCarritoEl.innerText = "x" + cart[id-1];
        const precioSubtotalEl = cartContainer.querySelector('.price-of-' + id);
        precioSubtotalEl.innerText = "$" + (productos[(id - 1)].price * cart[id-1]).toFixed(2);
    }

    if (cantProductos === 0){
        carritoVacio();
    }
}

function increment(id){
    cart[id-1] ++;
    cantProductos ++;
    total += productos[(id -1)].price.toFixed(2);

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
    total -= (productos[(id -1)].price * cart[id-1]).toFixed(2);
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
    const cartContainer = document.querySelector('#carrito');
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

function addToTotal(id){
    //Add the total to html
    const cartContainer = document.querySelector('#carrito');
    const totalAndConfirmDiv = document.createElement('div');

    totalAndConfirmDiv.innerHTML = `
        <div class="flex justify-between m-1" id="total">
            <p>Order total</p>
            <h1 class="text-xl font-bold" id="total-price">$0.00</h1>
        </div>
        <div class="bg-rose50 rounded-lg m-4 items-center flex h-12 p-4">
            <img src="./assets/images/icon-carbon-neutral.svg" alt="">
            <p class="tetx-sm ml-2">this is a <span class="font-semibold">carbon-neutral</span> delivery </p>
        </div>
        <button class="bg-realRed rounded-full p-2 tracking-wide text-white font-bold w-full text-center" onclick="confirmOrder()">Confirm Order</button>
    `;

    cartContainer.appendChild(totalAndConfirmDiv);

    const totalPriceEl = document.getElementById("total-price");
    totalPriceEl.innerText = "$" + total;
}

function confirmOrder(){
    alert("Thank you for your purchase!")
}