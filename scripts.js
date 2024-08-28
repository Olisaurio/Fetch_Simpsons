const URL = "https://thesimpsonsquoteapi.glitch.me/quotes";

const btnCreate = document.getElementById("generate-card");
const btnGenerateMultiple = document.getElementById("generate-multiple");
const cardsContainer = document.getElementById("cardsContainer");
const searchInput = document.getElementById("search");

btnCreate.addEventListener("click", getCharacter);
btnGenerateMultiple.addEventListener("click", showModal);
searchInput.addEventListener("input", filterCharacters);

function getCharacter() {
    fetch(URL)
        .then(response => response.json())
        .then(data => createCharacter(data[0]));
}

function createCharacter(item) {
    const div = document.createElement("div");
    div.className = "cardCharacter";

    const name = document.createElement("h2");
    name.textContent = item.character;

    const quote = document.createElement("p");
    quote.textContent = item.quote;

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.character;

    div.appendChild(name);
    div.appendChild(quote);
    div.appendChild(img);

    cardsContainer.appendChild(div);
}

function showModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block";

    const close = document.querySelector(".close");
    close.addEventListener("click", closeModal);
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

document.getElementById("confirm-generate").onclick = function () {
    const quantity = parseInt(document.getElementById("card-quantity").value, 10);
    if (isNaN(quantity) || quantity < 1 || quantity > 10) {
        alert("Por favor, ingresa un número válido entre 1 y 10.");
        return;
    }

    cardsContainer.innerHTML = '';


    for (let i = 0; i < quantity; i++) {
        fetch(URL)
            .then(response => response.json())
            .then(data => createCharacter(data[0]));
    }

    closeModal();
};

function filterCharacters() {
    const searchTerm = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".cardCharacter");

    cards.forEach(card => {
        const name = card.querySelector("h2").textContent.toLowerCase();
        if (name.includes(searchTerm)) {
            card.style.display = "block"; 
        } else {
            card.style.display = "none"; 
        }
    });
}