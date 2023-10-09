const token = localStorage.getItem("accessToken");
let first_contact_id = localStorage.getItem("first_contact_id");

const get_contacts = async () => {
  const response = await fetch("http://localhost:8000/api/contacts", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.status, response.statusText);
  if (response.status === 200) {
    const result = await response.json();
    const contactsList = document.getElementById("contactsList");
    //localStorage.setItem("first_contact_id", result[0].id)
    contactsList.innerHTML = "";
    for (let contact of result) {
      // Створюємо новий елемент списку (li) для кожного контакту
      let contactElement = document.createElement("li");
      contactElement.className = "contact";

      contactElement.addEventListener("click", () => {
        // Отримати ID контакту і передати його до функції displayContactData
        const contactId = contact.id;
        get_contact(contactId);
      });
      const contactElements = document.querySelectorAll(".contact");
      contactElements.forEach((contactElement) => {
        contactElement.addEventListener("click", () => {
          // Скасовуємо виділення всіх інших елементів
          contactElements.forEach((otherElement) => {
            otherElement.style.backgroundColor = "";
          });

          // Виділяємо обраний елемент
          contactElement.style.backgroundColor = "#15B2F5";
        });
      });

      // Створюємо контейнер для зображення контакту
      let imageContainer = document.createElement("div");
      imageContainer.className = "contact-image";

      // Створюємо зображення і додаємо його до контейнера
      let imgElement = document.createElement("img");
      if (contact.photo) {
        imgElement.src = contact.photo;
      } else {
        imgElement.src = "./images/contact_icon.jpg";
      }
      imgElement.alt = "Фото контакту";
      imgElement.className = "contactImage";
      imageContainer.appendChild(imgElement);

      // Створюємо контейнер для деталей контакту
      let detailsContainer = document.createElement("div");
      detailsContainer.className = "contact-details";

      // Додаємо ім'я контакту та ID
      let nameElement = document.createElement("h3");
      nameElement.textContent = `${contact.first_name} ${contact.last_name}`;
      nameElement.className = "text-contact";

      // Додаємо всі елементи до контейнера деталей
      detailsContainer.appendChild(nameElement);

      // Додаємо контейнери до елемента списку
      contactElement.appendChild(imageContainer);
      contactElement.appendChild(detailsContainer);

      // Додаємо елемент контакту до списку
      contactsList.appendChild(contactElement);
    }
  }
};

const get_contact = async (contact_id) => {
  console.log(contact_id);
  const response = await fetch(
    `http://localhost:8000/api/contacts/${contact_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.status, response.statusText);
  if (response.status === 200) {
    const result = await response.json();
/**
 * The get_contact function fetches a contact from the server and displays it on the page.
 *
 *
 *
 * @param contact_id Get the contact from the database

/**
 * the delete_contact function deletes a contact from the server
 *
 * @return A promise that resolves to a contact object
 *
 * @docauthor Trelent
 */
/**
 * The get_contact function fetches a contact from the server and displays it on the page.
 *
 *
 * @param contact_id Get the contact from the database
 *
 * @return A promise that resolves to a contact object
 *
 * @docauthor Trelent
 */
    const contact = document.getElementById("contact-id");
    contact.innerHTML = "";

    // Створюємо новий елемент списку (li) для кожного поля контакта
    let fieldElement = document.createElement("li");
    fieldElement.className = "field";

    // Створюємо контейнер для зображення поля
    let imageContainer = document.createElement("div");
    imageContainer.className = "field-image";

    // Створюємо зображення і додаємо його до контейнера
    let imgElement = document.createElement("img");
    if (result.photo) {
      imgElement.src = result.photo;
    } else {
      imgElement.src = "./images/contact_icon.jpg";
    }
    imgElement.alt = "Фото контакту";
    imgElement.className = "fieldImage";
    imageContainer.appendChild(imgElement);

    // Створюємо контейнер для деталей контакту
    let detailsContainer = document.createElement("div");
    detailsContainer.className = "field-details";

    let pContainer = document.createElement("div");
    pContainer.className = "p-field-details";

    // Додаємо інші поля контакту
    let nameElement = document.createElement("h3");
    nameElement.textContent = `${result.first_name} ${result.last_name}`;
    nameElement.className = "text-contact";
    let locationElement = document.createElement("p");
    locationElement.className = "field-info-location";
    locationElement.textContent = `Location: ${result.location}`;
    let companyElement = document.createElement("p");
    companyElement.className = "field-info-company";
    companyElement.textContent = `Company: ${result.company}`;
    let positionElement = document.createElement("p");
    positionElement.className = "field-info-position";
    positionElement.textContent = `Position: ${result.position}`;
    let emailElement = document.createElement("p");
    emailElement.className = "field-info-email";
    emailElement.textContent = `Email: ${result.email}`;
    let phoneElement = document.createElement("p");
    phoneElement.className = "field-info-tel";
    phoneElement.textContent = `Phone number: ${result.phone_number}`;
    let birthdayElement = document.createElement("p");
    birthdayElement.className = "field-info-birthday";
    birthdayElement.textContent = `Birth date: ${result.birth_date}`;
    let notesElement = document.createElement("p");
    notesElement.className = "field-info-note";
    notesElement.textContent = `Note: ${result.notes}`;

    // Додаємо всі елементи до контейнера деталей
    detailsContainer.appendChild(nameElement);
    pContainer.appendChild(locationElement);
    pContainer.appendChild(companyElement);
    pContainer.appendChild(positionElement);
    pContainer.appendChild(emailElement);
    pContainer.appendChild(phoneElement);
    pContainer.appendChild(birthdayElement);
    pContainer.appendChild(notesElement);

    // Додаємо контейнери до елемента списку
    fieldElement.appendChild(imageContainer);
    fieldElement.appendChild(detailsContainer);
    fieldElement.appendChild(pContainer);

    // Додаємо елемент контакту до списку
    contact.appendChild(fieldElement);
  }
};

get_contacts();
//get_contact(first_contact_id)

contactCreate.addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await fetch("http://localhost:8000/api/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
    }),
  });
  console.log(response.body);
  if (response.status === 201) {
    console.log("Contact was created succesfully");
    get_contacts();
  }
});


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
