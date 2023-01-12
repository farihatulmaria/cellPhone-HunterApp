// taking the searched phone value

const searchPhones = () => {
  const searchField = document.querySelector("#search-field");
  const searchText = searchField.value.toLowerCase();
  searchField.value = "";

  if (searchText == "") {
    notFound("Please type any phone name..!");
  } else {
    // loading data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayPhones(data));
  }
};
// error message giving function
const notFound = (message) => {
  const error = document.querySelector(".section-phones .row");
  const div = document.createElement("div");
  div.innerHTML = `
    <h4 class="text-center text-light p-5 bg-danger rounded">${message}</h4>
    `;
  error.appendChild(div);
};

// displaying the phones

const displayPhones = (allPhones) => {
  const displayPhonesSection = document.querySelector(".section-phones .row");
  displayPhonesSection.innerHTML = "";

  if (allPhones.status == false) {
    notFound("No result found for your search..!"); //this function for not found phone
  } else {
    const phones = allPhones.data.slice(0, 20);
    for (const phone of phones) {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
          <div class="card h-100 p-3 text-center" id="${phone.slug}">
            <img src="${phone.image}" class="card-img-top mx-auto" alt="${phone.phone_name}" />
            <div class="card-body">
              <h3 class="card-title fw-bold">${phone.phone_name}</h3>
              
              <button class="btn bg-primary text-white fw-bold" onclick="loadDetails('${phone.slug}')" 
              data-bs-toggle="modal"
              data-bs-target="#modalKing">
              Read Details
              </button>
              
            </div>
          </div>
        `;

      displayPhonesSection.appendChild(div);
    }
  }
};

const loadDetails = (phoneId) => {
  const detailUrl = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(detailUrl)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data));
};

const displayDetails = (details) => {
  const modalBody = document.querySelector(".modal-body");

  modalBody.innerHTML = `
    <div class="row p-3">
      <div class="col-md-5">
        <div class="text-center py-5">
        <img src="${details.image}" class="mx-auto Phone-img" alt="${details.name}" />
        </div>
      </div>

      <div class="col-md-7">
        <h2 class ="fw-bold">${details.name}</h2>

        <p class="fw-bold">Brand : ${details.brand}</p>

        <ul class ="my-3 feature-list mt-3">
          <div class ="fw-bold">Main Features:</div> 
        </ul>
        <ul class ="my-3 others-list">
          <div class ="fw-bold">Others:</div>
        </ul>
      </div>

    </div>
  `;
  const featureList = document.querySelector(".feature-list");
  const featureListKeys = Object.keys(details.mainFeatures);
  featureListKeys.forEach((key, index) => {
    const li = document.createElement("li");
    li.classList.add("my-3");
    li.innerText = `${key}: ${details.mainFeatures[key]}`;

    featureList.appendChild(li);
  });

  const othersList = document.querySelector(".others-list");
  const othersListKeys = Object.keys(details.others);
  othersListKeys.forEach((key, index) => {
    const li = document.createElement("li");
    li.classList.add("my-3");
    li.innerText += `${key}: ${details.others[key]}`;

    othersList.appendChild(li);
  });
};
