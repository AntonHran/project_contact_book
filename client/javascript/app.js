token = localStorage.getItem('accessToken')

const get_contacts = async () => {
     const response = await fetch('http://localhost:8000/api/contacts', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
     })
    console.log(response.status, response.statusText)
    if (response.status === 200) {
        result = await response.json()
        contacts.innerHTML = ''
        for (contact of result) {
            el = document.createElement('li')
            el.className = 'list-group-item'
            el.innerHTML = `ID: ${contact.id} First name: <b>${contact.first_name}</b>
                            Last name: ${contact.last_name} <br> Location: ${contact.location} <br>
                            Company: ${contact.company} <br> Position: ${contact.position}
                            Photo: ${contact.photo} <br> Email: ${contact.email} <br>
                            Phone number: ${contact.phone_number} <br> Birthday: ${contact.birth_date} <br>
                            Notes: ${contact.notes}`
            el_1 = document.createElement("img")
            el_1.className = 'image'
            el_1.src = contact.photo
            contacts.appendChild(el)
            contacts.appendChild(el_1)
        }
    }
}


get_contacts()
// get_owners()

contactCreate.addEventListener('submit', async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:8000/api/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            first_name: contactCreate.first_name.value,
            last_name: contactCreate.last_name.value,
            location: contactCreate.location.value,
            company: contactCreate.company.value,
            position: contactCreate.position.value,
            email: contactCreate.email.value,
            phone_number: contactCreate.phone.value,
            birth_date: contactCreate.birthday.value,
            notes: contactCreate.note.value,
        })
    })
    console.log(response.body)
    if (response.status === 201) {
        console.log('Contact was created succesfully');
        get_contacts()
    }
})


const get_owners = async () => {
     const response = await fetch('http://localhost:8000/api/owners', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
     })
    console.log(response.status, response.statusText)
    if (response.status === 200) {
        result = await response.json()
        owners.innerHTML = ''
        for (owner of result) {
            el = document.createElement('li')
            el.className = 'list-group-item'
            el.innerHTML = `ID: ${owner.id} email: ${owner.email}`
            owners.appendChild(el)
        }
    }
}