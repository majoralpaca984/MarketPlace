const productBox = document.getElementById("productBox");

const productsEndpoint = "https://striveschool-api.herokuapp.com/api/product/";

async function getProduct() {
    try {
        const query = window.location.search;
        const params = new URLSearchParams(query);
        const prodId = params.get("q");

        const response = await fetch(`${productsEndpoint}${prodId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMGY1NzFlMTQwNjAwMTUzMTRkNzMiLCJpYXQiOjE3NDA1MDkwMTUsImV4cCI6MTc0MTcxODYxNX0.MsYyJCntBws9dLD2srqznjRO1T5pmYpyZxti_oPqypI',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data);
        const myProductCard = createTemplate(data);
        productBox.appendChild(myProductCard);
    } catch (err) {
        console.log("Errore:", err);
    }
}

getProduct();

function createTemplate(Product) {
    const container = document.createElement('div');
    container.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'mt-5');


    const productCard = document.createElement('div');
    productCard.classList.add('card', 'shadow-lg', 'border-0', 'p-3', 'rounded');
    productCard.style.maxWidth = "500px";

    const productImg = document.createElement('img');
    productImg.src = Product.imageUrl;
    productImg.classList.add('card-img-top', 'img-fluid', 'rounded');
    productImg.alt = Product.name || "Immagine prodotto";

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'text-center');

    const productName = document.createElement('h4');
    productName.classList.add('card-title', 'fw-bold');
    productName.innerText = Product.name;

    const productBrand = document.createElement('h6');
    productBrand.classList.add('text-muted');
    productBrand.innerText = `Brand: ${Product.brand}`;

    const productDesc = document.createElement('p');
    productDesc.classList.add('card-text', 'text-secondary');
    productDesc.innerText = Product.description;

    const productPrice = document.createElement('h5');
    productPrice.classList.add('fw-bold', 'text-danger');
    productPrice.innerText = `€${Product.price}`;

    
    const buyButton = document.createElement('button');
    buyButton.classList.add('btn', 'btn-info', 'mt-3');
    buyButton.style.width = "80%"; 
    buyButton.innerText = "Acquista Ora";

    
    cardBody.append(productName, productBrand, productDesc, productPrice, buyButton);
    productCard.append(productImg, cardBody);
    container.appendChild(productCard);

    return container;
}


