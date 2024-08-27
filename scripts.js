const URL = "https://thesimpsonsquoteapi.glitch.me/quotes";
const btnCreate = document.getElementById("generate-card")
const main = document.getElementById("main");
const cardsContainer = document.getElementById("cardsContainer");
btnCreate.addEventListener("click", getCharacter);

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

    cardsContainer.innerHTML = '';
    cardsContainer.appendChild(div);
}






const generateMultiple = document.getElementById("generate-multiple");
generateMultiple.addEventListener("click", showModal)
function showModal() {
    const modal = document.getElementById("modal"); 
    modal.style.display = "block"; 
    console.log("funciona?");
}



const close = document.querySelector(".close")
close.addEventListener("click", closeModal);
function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none"; 
}





const getNumber = document.getElementById("card-quantity");

const btnGenerate = document.getElementById("confirm-generate")
btnGenerate.addEventListener("click", confirmGenerate);

generateCharacters = 0;

function confirmGenerate() {
    while (generateCharacters <= getNumber) {
        getCharacter()
        createCharacter()
        closeModal()
    }
    
}

