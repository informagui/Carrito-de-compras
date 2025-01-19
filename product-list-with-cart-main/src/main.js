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
    total += productos[(id -1)].price;
    //Obteniendo html
    cantProductosEl.innerText = cantProductos;
    const producto = document.getElementById(id);
    const imgEl = producto.querySelector('div.big-img');
    const button =producto.querySelector('button.add-cart');

    //Cambiando imagen
    imgEl.classList.add('border-2', 'border-realRed');
    //Cambiando el boton de add to cart
    button.removeAttribute('onclick');
    button.classList.add('bg-realRed');
    button.innerHTML = `
        <button class="decrement border border-white text-white rounded-full w-6 h-6 font-bold" onclick="decrement(${id})">-</button>
        <span class="quantity text-white font-bold mx-6">1</span>
        <button class="increment border border-white text-white rounded-full w-6 h-6 font-bold" onclick="increment(${id})">+</button>
    `;

    //Cambiando el carrito
    addToTotal();
    addToCart(id);
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
        total -= productos[(id -1)].price;

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

    addToTotal();
}

function increment(id){
    cart[id-1] ++;
    cantProductos ++;
    total += productos[(id -1)].price;

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

    addToTotal();
}

function removeFromCart(id){
    total -= (productos[(id -1)].price * cart[id-1]);
    cantProductos -= cart[id-1];
    cantProductosEl.innerText = cantProductos;
    cart[id-1] = 0;

    if (cantProductos === 0){
        carritoVacio();
    }else{
        addToTotal();
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
     <div onclick="addProduct(${productId})" class="flex">
        <img src="./assets/images/icon-add-to-cart.svg" alt="">
        Add to cart
    </div>
    `;

    const imgEl = producto.querySelector('div.big-img');
    imgEl.classList.remove('border-2', 'border-realRed');
}
 
function carritoVacio(){
    isCartEmpty = true;
    const cartContainer = document.querySelector('#cart');
    cartContainer.innerHTML = '';
    
    // Agrega el mensaje de carrito vacío
    cartContainer.innerHTML = `
        <div id="empty-cart">
        <img src="./assets/images/illustration-empty-cart.svg" alt="" class="mx-auto">
        <p class="text-sm text-center lg:mt-2 lg:text-base">Your added items will appear here</p>
        </div>
    `;      
    cantProductosEl = document.getElementById("cant-productos");
}

 function addToTotal(){
    //Add the total to html
    let totalAndConfirmDiv = document.getElementById('total-and-confirm');
    if (!totalAndConfirmDiv){
        const carritoContainer = document.querySelector('#cart');
        const totalAndConfirmDiv = document.createElement('div');
        totalAndConfirmDiv.id = 'total-and-confirm';

        totalAndConfirmDiv.innerHTML = `
            <div class="flex justify-between m-1" id="total">
                <p>Order total</p>
                <h1 class="text-xl font-bold" id="total-price">$0.00</h1>
            </div>
            <div class="bg-rose50 rounded-lg m-4 text-center flex h-14 p-4">
                <img src="./assets/images/icon-carbon-neutral.svg" alt="">
                <p class="tetx-sm text-center ">this is a <span class="font-semibold">carbon-neutral</span> delivery </p>
            </div>
            <button class="bg-realRed rounded-full p-2 tracking-wide text-white font-bold w-full text-center" onclick="confirmOrder()">Confirm Order</button>
        `;

        
        carritoContainer.appendChild(totalAndConfirmDiv);
    }

    const totalPriceEl = document.getElementById("total-price");
    totalPriceEl.innerText = "$" + total.toFixed(2);
} 

function confirmOrder(){
    const modal = document.getElementById('modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function irAlCarrito() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}


function closeModal(){
    location.reload();
}