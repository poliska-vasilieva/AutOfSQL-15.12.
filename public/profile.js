document.addEventListener('DOMContentLoaded', () => {
    let email = document.getElementById('email')
    let name = document.getElementById('name')

    fetch('/profile', {
        method: 'GET',
    })
    .then(response => {
        console.log(response)
        return response.json()
    }).then(data => {
        email.value = data.email
        name.value = data.name
    })
})
