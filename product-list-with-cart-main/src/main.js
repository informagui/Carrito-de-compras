const cart = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let cantProductos = 0;
let cantProductosEl= document.getElementById("cant-productos");

function addProduct(id){
    cart[id-1] ++;
    cantProductos ++;
    cantProductosEl.innerText = cantProductos;
    const producto = document.getElementById(id);
    const button =producto.querySelector('button.add-cart');
    button.classList.add('bg-realRed');
    button.innerHTML = `
        <button class="decrement border border-white text-white rounded-full w-6 h-6 font-bold" onclick="decrement(${id})">-</button>
        <span class="quantity text-white font-bold mx-6">1</span>
        <button class="increment border border-white text-white rounded-full w-6 h-6 font-bold" onclick="increment(${id})">+</button>
    `;
      
}