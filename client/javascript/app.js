const token = localStorage.getItem('accessToken')

const get_contacts = async () => {
     const response = await fetch('http://localhost:8000/api/contacts', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
     });
    console.log(response.status, response.statusText)
    if (response.status === 200) {
        const result = await response.json()
        const contactsList = document.getElementById('contactsList')
        contactsList.innerHTML = '';
        for (let contact of result) {
            // Створюємо новий елемент списку (li) для кожного контакту
            let contactElement = document.createElement("li");
            contactElement.className = 'contact';

            // Створюємо контейнер для зображення контакту
            let imageContainer = document.createElement("div");
            imageContainer.className = 'contact-image';

            // Створюємо зображення і додаємо його до контейнера
            let imgElement = document.createElement("img");
            imgElement.src = contact.photo;
            imgElement.alt = "Фото контакту";
            imgElement.className = 'contactImage';
            imageContainer.appendChild(imgElement);

            // Створюємо контейнер для деталей контакту
            let detailsContainer = document.createElement("div");
            detailsContainer.className = 'contact-details';

            // Додаємо ім'я контакту та ID
            let nameElement = document.createElement("h3");
            nameElement.textContent = `${contact.first_name} ${contact.last_name}`;
            nameElement.className = 'text-contact';
            // let idElement = document.createElement("p");
            // idElement.textContent = `ID: ${contact.id}`;

            // Додаємо всі елементи до контейнера деталей
            detailsContainer.appendChild(nameElement);
            // detailsContainer.appendChild(idElement);

            // Додаємо контейнери до елемента списку
            contactElement.appendChild(imageContainer);
            contactElement.appendChild(detailsContainer);

            // Додаємо елемент контакту до списку
            contactsList.appendChild(contactElement);
            };
        };
};


function addOption(selectbox,text,value, image)
{var optn = document.createElement("OPTION");
    optn.image = image
    optn.text = text;
    optn.value = value;
    selectbox.options.add(optn);
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

 (() => {
  const refs = {
    openModalBtn: document.querySelector("[data-create-open]"),
    closeModalBtn: document.querySelector("[data-create-close]"),
    modal: document.querySelector("[data-create]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }
})();

//let el_1 = document.createElement("img");
//            el_1.className = 'image';
//            el_1.src = contact.photo;
//            let el = document.createElement('theListBox');
//            el.className = 'selectedItem';
//            el.innerHTML = `ID: ${contact.id} Full name: <b>${contact.first_name} ${contact.last_name}</b>`;
//                            //<br> Location: ${contact.location} <br>
//                            //Company: ${contact.company} <br> Position: ${contact.position}
//                            //Photo: ${contact.photo} <br> Email: ${contact.email} <br>
//                            //Phone number: ${contact.phone_number} <br> Birthday: ${contact.birth_date} <br>
//                            //Notes: ${contact.notes}
//            contacts.appendChild(el_1);
//            contacts.appendChild(el);