document.getElementById('registerButton').addEventListener('click', () => {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    let data = {
        email,
        password
    }

    fetch('/auth', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.status == 404) {
                alert('Аккаунт не существует')
                return
            }

            if (response.status == 400) {
                alert('Неверный пароль')
                return
            }


        })
})