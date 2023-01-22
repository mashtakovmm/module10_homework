// Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
// Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».

// При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.

// Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат

// Добавить в чат механизм отправки гео-локации

// При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести
// ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, 
// которое отправит обратно эхо-сервер, не выводить.

const sendBtn = document.querySelector(".send-btb")
const locBtn = document.querySelector(".location-btn")
const output = document.querySelector(".chat-container");
const input = document.querySelector("input")

const wsUrl = "wss://echo-ws-service.herokuapp.com"
let websocket = new WebSocket(wsUrl);

websocket.onopen = () => {
    output.innerHTML +="<p style=color:deeppink;>***Connected***</p>";
}

// websocket.onmessage = (event) => {
//     console.log(event)
//     showMsg(event.data, false);
// }

websocket.onerror = () => {
    output.innerHTML +="<p style=color:red;>!!!ERROR!!!</p>";
}

function showMsg(msg, client){
    if(client){
        output.innerHTML +=`<p class="client">${msg}</p>`;
    } else {
        output.innerHTML +=`<p class="server">${msg}</p>`;
    }
}

function sendMsg(msg){
    websocket.send(msg)
    showMsg(msg, true)
}

function getLocation()
{
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            websocket.send(coords)
            let link = `<a href='https://www.openstreetmap.org/#map=11/${coords.latitude}/${coords.longitude}'>
                Your location</a>`;
            output.innerHTML += link
            websocket.onmessage = (event) => {
                return
            }
            
        });
    } else {
        alert("Geolocation is not supported")
    }
}

sendBtn.addEventListener('click', function(){
    sendMsg(input.value);
    websocket.onmessage = (event) => {
        console.log(event)
        showMsg(event.data, false);
    }
    
})

locBtn.addEventListener('click', function(){
    getLocation()
})



