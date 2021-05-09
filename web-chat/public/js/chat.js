const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const token = sessionStorage.getItem('token');
const roomId = sessionStorage.getItem('roomId');

const socket = io({
  auth: {
    token,
  }
});

socket.emit('joinRoom', { roomId });

socket.on('messages-join-room', messages => {
    console.log(messages);

    messages.forEach(message => showMessage(message));

    chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('message', message => {
  console.log(message);

  showMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('connect_error', (err) => {
  console.log(err.message);
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage', {
      message: msg,
      roomId,
    });

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

function showMessage(data) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
        <p class="meta">${data.username} <span>${data.createdAt}</span></p>
        <p class="text">
            ${data.message}
        </p> `;
    document.querySelector('.chat-messages').appendChild(div);
}

function leaveRoom() {
  sessionStorage.removeItem('roomId');
  sessionStorage.removeItem('roomName');
}

function onLoadWindow(e) {
  const roomName = document.getElementById('room-name');
  const room = sessionStorage.getItem('roomName');

  roomName.innerText = room;
}

window.addEventListener('load', onLoadWindow);
