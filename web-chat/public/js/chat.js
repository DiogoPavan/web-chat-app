const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const token = sessionStorage.getItem('token');
const roomId = sessionStorage.getItem('roomId');

const socket = io({
  auth: {
    token,
  }
});

socket.emit('join-room', { roomId });

socket.on('messages-join-room', messages => {
    messages.forEach(message => showMessage(message));

    chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('message', message => {
  if (chatMessages.childNodes.length === 50) {
    chatMessages.removeChild(chatMessages.childNodes[0]);
  }

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit('chat-message', {
      message: msg,
      roomId,
    });

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

function showMessage(data) {
    const div = document.createElement('div');
    div.innerHTML = `<p class="meta"> <span>${data.createdAt}</span> ${data.username}: ${data.message}</p>`
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
