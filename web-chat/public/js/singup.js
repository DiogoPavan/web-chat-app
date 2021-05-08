const message = document.getElementById('message');

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

  message.innerText = '';
  message.classList = '';
  message.classList.add(postSingup.status == 201 ? 'success-message' : 'error-message');
  message.innerText = response.message;
}

const form = document.getElementById('singup-form');

form.addEventListener('submit', singupSubmit);
