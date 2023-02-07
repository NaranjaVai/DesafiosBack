const socket = io();
const productsContainer = document.getElementById('realtimeproducts')
const formulario = document.getElementById("formProduct");
let products = []

socket.on("Productos", (result) => {
    products = result;
    addProduct();
});

const addProduct = () =>{
    const boxes = products.map(p => {
        const box = document.createElement('div');
        box.innerHTML = `     
        
        <h2>${p.title}</h2>
        <h2>${p.description}</h2>
        <h2>${p.price}</h2>
        
        `
        return box;    
    }) 
    productsContainer.innerHTML ='';
    for (const box of boxes){
        productsContainer.appendChild(box);
    }
}

formulario.addEventListener('submit', (e)=>{
    e.preventDefault();
    submitFormulario();
})

const submitFormulario = async () =>{
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    console.log(title,description,price)
    await fetch("http://localhost:8080/api/realtimeproducts", {
        method:"post",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title:title,
            description:description,
            price: price
        })
    })
}
