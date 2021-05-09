const form = document.getElementById('index-form');

async function signIn(e) {
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
    window.location.replace('http://localhost:3000/lobby');
  }
}

form.addEventListener('submit', signIn);

window.addEventListener('load', (e) => {
  sessionStorage.clear()
})
