const socket = io();


//RECIBIMOS LOS PRODUCTOS EXISTENTES Y ACTUALIZAMOS LA VISTA CADA VEZ QUE SE ACTUALIZA UN PRODUCTO
socket.on('products', products => {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.innerHTML = `<h1>${product.title}</h1><h3>${product.price}</h3>`;
        productsContainer.appendChild(productElement);
    });    
});




let user;
let chatBox = document.getElementById('chatBox');

Swal.fire({
    title:"Identificate",
    input:"text",
    text:"Ingresa el usuario para identificarte en el chat",
    inputValidator: (value)=>{
        return !value && 'Necesitas escribir un nombre de usuario para coninuar!'
    },
    allowOutsideClick:false
}).then(result=>{
    user=result.value
});

chatBox.addEventListener('keyup',evt=>{
    if (evt.key==="Enter"){
        if(chatBox.value.trim().length>0){
            socket.emit("message",{user:user,message:chatBox.value});
            chatBox.value="";
        }
    }
})

socket.on('messageLogs', data=>{
    let log = document.getElementById('messageLogs');
    let messages="";
    Date.forEach(message=>{
        messages = messages+`${message.user} dice: ${message.message}</br>`
    })
    log.innerHTML = messages;
})

// socket.on('evento_socket_individual',data=>{
//     console.log(data);
// })
// socket.on('evento_para_todos_menos_socket_actual',data=>{
//     console.log(data);
// })
// socket.on('evento_para_todos',data=>{
//     console.log(data);
// })