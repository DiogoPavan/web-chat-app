const form = document.getElementById('singup-form');

async function singupSubmit(e) {
  e.preventDefault();

  const elements = e.target.elements;
  const username = elements.username.value;
  const password = elements.password.value;

  const postSingup = await fetch('http://localhost:3000/users/', {
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

  const message = document.getElementById('message');
  message.classList = '';
  message.classList.add(postSingup.status === 201 ? 'success-message' : 'error-message');
  message.innerText = response.message;
}

form.addEventListener('submit', singupSubmit);
