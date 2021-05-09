const form = document.getElementById('index-form');
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

async function joinChatSubmit(e) {
  e.preventDefault();

  const elements = e.target.elements;
  const username = elements.username.value;
  const password = elements.password.value;

  const postSingup = await fetch('http://localhost:3000/users/signIn', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).catch((err) => {
    console.log(err);
  });

  const response = await postSingup.json();

  if (postSingup.status !== 200) {
    const message = document.getElementById('message');
    message.classList = '';
    message.classList.add('error-message');
    message.innerText = response.message;
  } else {
    sessionStorage.setItem('token', response.data.token);
    sessionStorage.setItem('roomId', select.value);

    window.location.replace('http://localhost:3000/chat');
  }
}

window.addEventListener('load', onLoadWindow);
form.addEventListener('submit', joinChatSubmit);
