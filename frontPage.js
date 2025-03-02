const backUrl = "https://striveschool-api.herokuapp.com/api/product/";

let Products = [];

const searchButton = document.getElementById("search-Button");
searchButton.addEventListener('click', liveSearch);


//funzione per lo spinner
document.addEventListener("DOMContentLoaded", () => {
  const spinner = document.getElementById("mySpinner");

  function showSpinner() {
      spinner.classList.remove("d-none");
  }

  function hideSpinner() {
      spinner.classList.add("d-none");
  }

  async function fetchProducts() {
      try {
          showSpinner();
              const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
              headers: {
                  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMGY1NzFlMTQwNjAwMTUzMTRkNzMiLCJpYXQiOjE3NDA1MDkwMTUsImV4cCI6MTc0MTcxODYxNX0.MsYyJCntBws9dLD2srqznjRO1T5pmYpyZxti_oPqypI',
                  'Content-Type': 'application/json'
              }
          });

          const data = await response.json();
          Products = data;
          console.log("Prodotti:", data);

          renderPosts(Products);
      } catch (err) {
        console.log("Errore", err);
        
        } finally {
          hideSpinner(); 
      }
  }

  fetchProducts();
});


// Funzione di ricerca 
function liveSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchValue = searchInput.value.toLowerCase();

  const filteredProducts = Products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchValue) ||
      product.description.toLowerCase().includes(searchValue) ||
      product.brand.toLowerCase().includes(searchValue) ||
      product.price === Number(searchValue)
    );
  });

  renderPosts(filteredProducts);
}

// Funzione per creare una card 
function createTemplate({ _id, imageUrl, name, description, brand, price }) {
  const productBox = document.createElement("div");
  productBox.classList.add("card", "mb-5", "h-100");
  productBox.style.width = "18rem";

  const productImg = document.createElement('img');
  productImg.src = imageUrl; 
  productImg.alt = name;
  productImg.classList.add("card-img-top");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const productTitle = document.createElement("h5");
  productTitle.classList.add("card-title");
  productTitle.innerText = name;

  const productBrand = document.createElement("p");
  productBrand.classList.add("card-subtitle", "mb-2", "text-muted");
  productBrand.innerText = `Brand: ${brand}`;

  const productDesc = document.createElement("p");
  productDesc.classList.add("card-text");
  productDesc.innerText = description;

  const productPrice = document.createElement("h6");
  productPrice.classList.add("card-text", "fw-bold", "text-dark");
  productPrice.innerText = `€${price.toFixed(2)}`;

  const productLink = document.createElement("a");
  productLink.classList.add("btn", "btn-primary", "mt-2");
  productLink.innerText = "Dettagli";
  productLink.href = `details.html?q=${_id}`;

  cardBody.append(productTitle, productBrand, productDesc, productPrice, productLink);
  productBox.append(productImg, cardBody);

  return productBox;
}




/// funzine per renderizzare i prodotti

function renderPosts(products) {
  const container = document.getElementById("card-container");
  container.innerHTML = ""; 

  const row = document.createElement("div");
  row.classList.add("row", "gy-4", "gx-5"); 

  products.forEach(product => {
    const col = document.createElement("div");
    col.classList.add("col-md-4", "d-flex", "align-items-stretch");
    const card = createTemplate(product);
    col.appendChild(card);
    row.appendChild(col);
  });

  container.appendChild(row);
}
