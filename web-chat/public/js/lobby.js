const form = document.getElementById('lobby-form');
const select = document.getElementById('room-select');

async function onLoadWindow(e) {
  e.preventDefault();

  const getRooms = await fetch('http://localhost:3000/rooms', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).catch((err) => {
    console.log(err);
  });

  const response = await getRooms.json();
  const rooms = response.data;

  rooms.forEach((room) => {
    let option = document.createElement('option');
    option.text = room.name;
    option.value = room.id;

    select.appendChild(option);
  });
}

function joinChat(e) {
  e.preventDefault();

  sessionStorage.setItem('roomId', select.value);
  sessionStorage.setItem('roomName', select.options[select.selectedIndex].text);

  window.location.replace('http://localhost:3000/chat');
}

function signOut() {
  sessionStorage.removeItem('token');
  window.location.replace('http://localhost:3000/');
}

form.addEventListener('submit', joinChat);
window.addEventListener('load', onLoadWindow);
