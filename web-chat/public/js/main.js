const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const token = sessionStorage.getItem('token');
const roomId = sessionStorage.getItem('roomId');

const socket = io({
  auth: {
    token,
  }
});

// Join chatroom;
socket.emit('joinRoom', { roomId });

// Message from server;
socket.on('messages-join-room', messages => {
    console.log(messages);

    messages.forEach(message => outputMessage(message));

    chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('message', message => {
  console.log(message);

  outputMessage(message);

  //Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('connect_error', (err) => {
  console.log(err.message); // prints the message associated with the error
});

// message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get message text
    const msg = e.target.elements.msg.value;

    // emit message to server;
    socket.emit('chatMessage', {
      message: msg,
      roomId,
    });

    //clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
        <p class="meta">${message.username} <span>${message.createdAt}</span></p>
        <p class="text">
            ${message.message}
        </p> `;
    document.querySelector('.chat-messages').appendChild(div);
}

// add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
};

//add users
function outputUsers(users) {
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `
}
