const form = document.forms["signupForm"]

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: form.username.value,
            email: form.email.value,
            password: form.password.value
        }),
    })
    console.log(response.status, response.statusText)
    if (response.status === 200) {
        result = await response.json()
        localStorage.setItem('userName', result.username)
        localStorage.setItem('email', result.email)
        window.location = '/index.html'
    }
    else {
        console.log("Confirm your email before proceed/login")
    }
})


async function checkEmailConfirmation() {
    const response = await fetch("http://localhost:8000/api/auth/confirmed_email/{token}");
    return response.status === 200;
}
