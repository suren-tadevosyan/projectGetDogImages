let selectElement = document.getElementById("selectDog");
let container = document.getElementById("dogImages");
let number = document.getElementById("quantity");

function createImageElement(src) {
  let img = document.createElement("img");
  img.src = src;
  return img;
}

function clearContainer() {
  container.textContent = "";
}

function fetchImages(selectedBreed, length) {
  return fetch(
    `https://dog.ceo/api/breed/${selectedBreed}/images/random/${length}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.message.forEach((imgURL) => {
        let img = createImageElement(imgURL);
        img.onerror = () => {
          clearContainer();
          img.src = "404.jpg";
          container.appendChild(img);
          console.log("Image not found");
        };
        container.appendChild(img);
      });
    })
    .catch((err) => {
      console.error("Error fetching images:", err);
    });
}

fetch(`https://dog.ceo/api/breeds/list/all`)
  .then((res) => res.json())
  .then((data) => {
    let breeds = Object.keys(data.message);
    breeds.forEach((dog) => {
      let option = document.createElement("option");
      option.innerText = dog.charAt(0).toUpperCase() + dog.slice(1);
      selectElement.appendChild(option);
    });
  });

selectElement.addEventListener("change", () => {
  let selectedBreed =
    selectElement.value.charAt(0).toLowerCase() + selectElement.value.slice(1);
  clearContainer();
  number.innerHTML = "";

  fetch(`https://dog.ceo/api/breed/${selectedBreed}/images`)
    .then((res) => res.json())
    .then((data) => {
      data.message.forEach((imgURL, index) => {
        let img = createImageElement(imgURL);
        img.onerror = () => {
          
          img.src = "404.jpg";
          container.appendChild(img);
          console.log("Image not found");
        };
        container.appendChild(img);

        let option = document.createElement("option");
        option.innerText = index + 1;
        number.appendChild(option);
      });
    })
    .catch((err) => {
      console.error("Error fetching breed images:", err);
    });
});

number.addEventListener("change", () => {
  let selectedBreed =
    selectElement.value.charAt(0).toLowerCase() + selectElement.value.slice(1);
  clearContainer();
  let length = number.value;

  fetchImages(selectedBreed, length);
});
