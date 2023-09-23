let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");
let showComics = document.getElementById("show-comics");
let ts = "1695499326160";
let publicKey = "d49cf42ae460ce64823ac743089a34d0";
let hashVal = "e957f04f71b62523f50175a7f70c9ee5";

let date = new Date();
//console.log(date.getTime());

const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

function displayWords(value) {
  input.value = value;
  removeElements();
}

function removeElements() {
  listContainer.innerHTML = "";
}

input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.length < 4) {
    return false;
  }

  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

  const response = await fetch(url);
  const jsonData = await response.json();

  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, input.value.length) + "</b>";
    word += name.substr(input.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);
  });
});

button.addEventListener(
  "click",
  (getRsult = async () => {
    if (input.value.trim().length < 1) {
      alert("Input cannot be blank");
    }
    showContainer.innerHTML = "";
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data["results"].forEach((element) => {

      showContainer.innerHTML = `</div><div class="card-container">
        
        <div class="container-character-image">
        <img src="${
          element.thumbnail["path"] + "." + element.thumbnail["extension"]
        }"/></div>
        
        <div class="character-name">${element.name}</div>
        <div class="character-description">${element.description}</div>
        <div class="character-comics"><br><b>Cantidad de comics:</b> ${element.comics.available}</div>
        <div class="character-comics"><br><b>Cantidad de series:</b> ${element.series.available}</div>
        <div class="character-comics"><br><b>Cantidad de stories:</b> ${element.stories.available}</div>
        <div class="character-comics"><br><b>Cantidad de events:</b>${element.events.available}<br><br></div>
        <ul><div class="title-comics"><b>Series destacadas del personaje:</b><br><br></div>
          <li><div class="character-comics"><b>Primera serie:</b> ${element.series.items[0].name}<br></div></li>
          <li><div class="character-comics"><b>Segunda serie:</b> ${element.series.items[1].name}<br></div></li>
          <li><div class="character-comics"><b>Tercera serie:</b> ${element.series.items[2].name}<br></div></li>
        </ul>
        </div>`;
    });
  })
);

window.onload = () => {
  getRsult();
};