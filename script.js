// STORAGE
let animals = JSON.parse(localStorage.getItem("animals")) || [];
let missingDogs = JSON.parse(localStorage.getItem("missingDogs")) || [];

// NAVIGATION
function hideAllPages() {
    document.getElementById("home-page").style.display = "none";
    document.getElementById("adoption-page").style.display = "none";
    document.getElementById("lost-page").style.display = "none";
    document.getElementById("search-page").style.display = "none";
}

function hideAllForms() {
    document.getElementById("animal-form").style.display = "none";
    document.getElementById("owner-form").style.display = "none";
    document.getElementById("missing-form").style.display = "none";
    document.getElementById("found-form").style.display = "none";
}

function showMain(page) {
    hideAllPages();

    if (page === "adoption") {
        document.getElementById("adoption-page").style.display = "block";
    } else {
        document.getElementById("lost-page").style.display = "block";
    }
}

function showSearch() {
    hideAllPages();
    document.getElementById("search-page").style.display = "block";
}

function goHome() {
    hideAllPages();
    document.getElementById("home-page").style.display = "block";
}

function showAdoption(type) {
    hideAllForms();

    if (type === "animal") {
        document.getElementById("animal-form").style.display = "block";
    } else {
        document.getElementById("owner-form").style.display = "block";
    }
}

function showLost(type) {
    hideAllForms();

    if (type === "missing") {
        document.getElementById("missing-form").style.display = "block";
    } else {
        document.getElementById("found-form").style.display = "block";
    }
}

// CREATE ANIMAL
function submitAdoptionAnimalProfile(event) {
    event.preventDefault();

    const name = document.getElementById("animal-name").value;
    const type = document.getElementById("animal-type").value;

    const file = document.getElementById("animal-picture").files[0];
    const image = file ? URL.createObjectURL(file) : "";

    animals.push({
        name,
        type,
        image,
        status: "Available"
    });

    localStorage.setItem("animals", JSON.stringify(animals));

    alert("Animal added!");
}

// MISSING DOG
function submitMissingDogProfile(event) {
    event.preventDefault();

    const name = document.getElementById("missing-dog-name").value;
    const color = document.getElementById("missing-dog-color").value;

    missingDogs.push({
        name,
        color,
        status: "Missing"
    });

    localStorage.setItem("missingDogs", JSON.stringify(missingDogs));

    alert("Missing dog added!");
}

// FOUND DOG
function submitFoundDogProfile(event) {
    event.preventDefault();

    const color = document.getElementById("found-dog-color").value;

    missingDogs.push({
        name: "Unknown",
        color,
        status: "Found"
    });

    localStorage.setItem("missingDogs", JSON.stringify(missingDogs));

    alert("Found dog added!");
}

// SEARCH GRID
function searchAll() {
    const container = document.getElementById("search-results");
    container.innerHTML = "";
    container.className = "grid";

    animals.forEach((animal, index) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${animal.image || 'https://via.placeholder.com/200'}">
            <h3>${animal.name}</h3>
            <p>${animal.type}</p>
            <p>Status: ${animal.status}</p>
            <button onclick="markAdopted(${index})">Adopt</button>
        `;

        container.appendChild(card);
    });

    missingDogs.forEach((dog, index) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${dog.name}</h3>
            <p>${dog.color}</p>
            <p>Status: ${dog.status}</p>
            <button onclick="markFound(${index})">Mark Found</button>
        `;

        container.appendChild(card);
    });
}

// STATUS
function markAdopted(index) {
    animals[index].status = "Adopted";
    localStorage.setItem("animals", JSON.stringify(animals));
    searchAll();
}

function markFound(index) {
    missingDogs[index].status = "Found";
    localStorage.setItem("missingDogs", JSON.stringify(missingDogs));
    searchAll();
}

// LOAD HOME FIRST
window.onload = function () {
    goHome();
};
