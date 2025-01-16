const cart = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let cantProductos = 0;
let cantProductosEl= document.getElementById("cant-productos");

function addProduct(id){
    cart[id-1] ++;
    cantProductos ++;
    cantProductosEl.innerText = cantProductos;
    const producto = document.getElementById(id);
    const button =producto.querySelector('button.add-cart');
    button.removeAttribute('onclick');
    button.classList.add('bg-realRed');
    button.innerHTML = `
        <button class="decrement border border-white text-white rounded-full w-6 h-6 font-bold" onclick="decrement(${id})">-</button>
        <span class="quantity text-white font-bold mx-6">1</span>
        <button class="increment border border-white text-white rounded-full w-6 h-6 font-bold" onclick="increment(${id})">+</button>
    `;
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
}

function increment(id){
    const producto = document.getElementById(id);
    const cantidadEl = producto.querySelector('.quantity');
    let cantidad = cantidadEl.innerText;
    cantidad ++;
    cantidadEl.innerText = cantidad;
    cantProductos ++;
    cantProductosEl.innerText = cantProductos;
}

function resetButton(productId) {
const container = document.getElementById(productId);
const button = container.querySelector('button');
button.className = 'add-cart'; // Restaurar las clases originales
button.innerHTML = `
    <img src="./assets/images/icon-add-to-cart.svg" alt="">
    Add to cart
`;
}
  