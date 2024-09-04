const URL = "https://rickandmortyapi.com/api/character";
const btnCreate = document.getElementById("generate-card");
const btnGenerateMultiple = document.getElementById("generate-multiple");
const cardsContainer = document.getElementById("cardsContainer");
const searchInput = document.getElementById("search");

let characterSet = new Set(); // Conjunto para almacenar IDs de personajes
let characters = []; // Arreglo para almacenar personajes

btnCreate.addEventListener("click", () => {
    cardsContainer.innerHTML = '';
    getCharacter();
});

btnGenerateMultiple.addEventListener("click", showModal);

searchInput.addEventListener("input", filterCharacters);

function getCharacter() {
    const random = Math.floor(Math.random() * 20) + 1;
    fetch(URL)
        .then(response => response.json())
        .then(data => createCharacter(data.results[random]));
}

function createCharacter(item) {
    const div = document.createElement("div");
    div.className = "cardCharacter";

    const name = document.createElement("h2");
    name.textContent = item.name;

    const status = document.createElement("p");
    status.textContent = item.status;

    const species = document.createElement("p");
    species.textContent = `Species: ${item.species}`;

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;

    div.appendChild(name);
    div.appendChild(status);
    div.appendChild(species);
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
    if (isNaN(quantity) || quantity < 1 || quantity > 20) {
        alert("Por favor, ingresa un número válido entre 1 y 10.");
        return;
    }

    cardsContainer.innerHTML = '';
    characterSet.clear(); // Limpiar el conjunto para una nueva generación
    characters = []; // Limpiar el arreglo para una nueva generación

    generateMultipleCharacters(quantity);
    closeModal();
};

function generateMultipleCharacters(quantity) {
    if (characters.length < quantity) {
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                const random = Math.floor(Math.random() * 20);
                const character = data.results[random];
                const characterId = character.id;

                if (!characterSet.has(characterId)) {
                    characterSet.add(characterId);
                    characters.push(character);
                    createCharacter(character);

                    // Llamar nuevamente si no se ha alcanzado la cantidad deseada
                    if (characters.length < quantity) {
                        generateMultipleCharacters(quantity);
                    }
                } else {
                    // Si el personaje ya existe, llamar nuevamente
                    generateMultipleCharacters(quantity);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}

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