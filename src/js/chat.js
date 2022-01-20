const socket = io();
const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

chatInput.addEventListener("keypress", (event) => {
    if(event.keyCode === 13){
        send();
    }
})
function send(){
  //데이터를 오브젝트 형태로 전달
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }
    socket.emit("chatting", param);
}

sendButton.addEventListener("click", send);
//채널이름 chatting

function LiModel(name, msg, time){
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () =>{
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent": "received");
        const dom = `<span class = "profile">
        <span class="user">${this.name}</span>
        <img class = "image" src="https://placeimg.com/50/50/any" alt="any">
    </span>
    <span class="message">${this.msg}</span>
    <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li);
    };
}

//서버에서 주는 메시지 받기 (data가 서버 에서 전달 한 메시지라고 생각하면 됨)
socket.on("chatting", (data) => {
    const{name, msg, time} = data;
    var item = new LiModel(name, msg, time);
    item.makeLi();
    displayContainer.scrollTo(0, displayContainer.scrollHeight);
})

