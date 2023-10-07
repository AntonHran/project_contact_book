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
                            Last name: ${contact.last_name} Email: ${contact.email}
                            Phone number: ${contact.phone_number} Birthday: ${contact.birth_date}
                            Notes: ${contact.notes}`
            contacts.appendChild(el)
        }
    }
}

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
            email: contactCreate.email.value,
            phone_number: contactCreate.phone.value,
            birth_date: contactCreate.birthday.value,
            notes: contactCreate.note.value,
        })
    })
    console.log(response.body.JSON)
    if (response.status === 201) {
        console.log('Contact was created succesfully');
        get_contacts()
    }
})
