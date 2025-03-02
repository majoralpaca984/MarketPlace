const backUrl = "https://striveschool-api.herokuapp.com/api/product/";
let Products = [];

const searchButton = document.getElementById("search-Button");
searchButton.addEventListener('click', liveSearch);

async function fetchProducts() {
    try {
        const response = await fetch(backUrl, {
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
    }
}

fetchProducts();

function renderPosts(posts) {
    const resultBox = document.getElementById("results");
    const postNodes = posts.map(post => createRow(post));
    resultBox.innerHTML = "";
    resultBox.append(...postNodes);
}

function myTd(content) {
    const td = document.createElement("td");
    td.textContent = content;
    return td;
}

function createRow({ _id, name, description, brand, price }) {
    const tableRow = document.createElement("tr");

    const cellName = myTd(name);
    const cellDescription = myTd(description);
    const cellBrand = myTd(brand);
    const cellPrice = myTd(price);

    // Creazione del bottone di modifica (PUT)
    const editButton = document.createElement("button");
    editButton.textContent = "Modifica";
    editButton.className = "btn btn-outline-warning";
    editButton.onclick = () => editProduct(_id);

    // Creazione del bottone di eliminazione (DELETE)
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Elimina";
    deleteButton.className = "btn btn-danger";
    deleteButton.onclick = () => deleteProduct(_id);

    const cellAction = document.createElement("td");
    cellAction.append(editButton, deleteButton);

    tableRow.append(cellName, cellDescription, cellBrand, cellPrice, cellAction);
    return tableRow;
}

async function editProduct(id) {
    const newName = prompt("Inserisci il nuovo nome del prodotto:");
    const newDescription = prompt("Inserisci la nuova descrizione:");
    const newBrand = prompt("Inserisci il nuovo brand:");
    const newPrice = prompt("Inserisci il nuovo prezzo:");

    if (!newName || !newDescription || !newBrand || !newPrice) {
        alert("Tutti i campi sono obbligatori!");
        return;
    }

    const updatedProduct = {
        name: newName,
        description: newDescription,
        brand: newBrand,
        price: Number(newPrice),
    };

    try {
        const response = await fetch(backUrl + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMGY1NzFlMTQwNjAwMTUzMTRkNzMiLCJpYXQiOjE3NDA1MDkwMTUsImV4cCI6MTc0MTcxODYxNX0.MsYyJCntBws9dLD2srqznjRO1T5pmYpyZxti_oPqypI'
            },
            body: JSON.stringify(updatedProduct)
        });

        if (response.ok) {
            alert("Prodotto modificato!");
            fetchProducts(); 
        } else {
            alert("Errore durante la modifica del prodotto.");
        }
    } catch (err) {
        console.log("Errore nella modifica:", err);
    }
}

async function deleteProduct(id) {
    if (!confirm("Sei sicuro di voler eliminare questo prodotto?")) return;

    try {
        const response = await fetch(backUrl + id, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMGY1NzFlMTQwNjAwMTUzMTRkNzMiLCJpYXQiOjE3NDA1MDkwMTUsImV4cCI6MTc0MTcxODYxNX0.MsYyJCntBws9dLD2srqznjRO1T5pmYpyZxti_oPqypI'
            }
        });

        if (response.ok) {
            alert("Prodotto eliminato con successo!");
            fetchProducts(); 
        } else {
            alert("Errore durante l'eliminazione del prodotto.");
        }
    } catch (err) {
        console.log("Errore nella cancellazione:", err);
    }
}

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
