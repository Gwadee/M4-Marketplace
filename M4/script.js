const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzE3NWZjMzNkYmUxNDAwMTUxNTRkMjQiLCJpYXQiOjE3NDEyOTgwMzcsImV4cCI6MTc0MjUwNzYzN30.qjvN58l9gB2FO1qE1tlUU-ndztP4Wus0XV0JBV6Z_wo"; 

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("productForm");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const newProduct = {
                name: document.getElementById("productName").value,
                description: document.getElementById("productDescription").value,
                brand: document.getElementById("productBrand").value,
                imageUrl: document.getElementById("productImagine").value,
                price: parseFloat(document.getElementById("productPrice").value),
            };

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${TOKEN}`
                    },
                    body: JSON.stringify(newProduct)
                });

                if (response.ok) {
                    alert("Prodotto aggiunto con successo!");
                    form.reset();
                } else {
                    throw new Error("Errore nell'aggiunta del prodotto");
                }
            } catch (error) {
                console.error(error);
                alert("Errore nell'invio del prodotto. Riprova!");
            }
        });
    }
});

// Funzione per recuperare e mostrare i prodotti
async function fetchProducts() {
    try {
        const response = await fetch(API_URL, {
            headers: { "Authorization": `Bearer ${TOKEN}` }
        });
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Errore nel recupero prodotti", error);
    }
}

// Funzione per mostrare i prodotti nella homepage
function displayProducts(products) {
    const container = document.getElementById("product-list");
    if (!container) return;

    container.innerHTML = "";
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";

        productDiv.innerHTML = `
            <div class="card product-card shadow-sm">
                <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="fw-bold">💰 ${product.price}€</p>
                    <a href="product.html?id=${product._id}" class="btn btn-primary">Dettagli</a>
                    <button onclick="deleteProduct('${product._id}')" class="btn btn-danger mt-2">Elimina</button>
                    <button onclick="editProduct('${product._id}')" class="btn btn-warning mt-2">Modifica</button>
                </div>
            </div>
        `;

        container.appendChild(productDiv);
    });
}


// Recupera i prodotti se siamo nella homepage
if (document.getElementById("product-list")) {
    fetchProducts();
}

async function deleteProduct(productId) {
    if (!confirm("Sei sicuro di voler eliminare questo prodotto?")) return;

    try {
        const response = await fetch(`${API_URL}${productId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${TOKEN}` }
        });

        if (response.ok) {
            alert("Prodotto eliminato con successo!");
            fetchProducts(); // Ricarica i prodotti aggiornati
        } else {
            throw new Error("Errore nell'eliminazione del prodotto");
        }
    } catch (error) {
        console.error(error);
        alert("Errore nell'eliminazione del prodotto. Riprova!");
    }
}

function editProduct(productId) {
    window.location.href = `backoffice.html?edit=${productId}`;
}

async function loadProductForEditing() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("edit");

    if (productId) {
        try {
            const response = await fetch(`${API_URL}${productId}`, {
                headers: { "Authorization": `Bearer ${TOKEN}` }
            });

            if (!response.ok) throw new Error("Errore nel caricamento del prodotto");

            const product = await response.json();
            document.getElementById("productName").value = product.name;
            document.getElementById("productBrand").value = product.brand;
            document.getElementById("productPrice").value = product.price;
            document.getElementById("productImagine").value = product.imageUrl;
            document.getElementById("productDescription").value = product.description;

            document.getElementById("submitBtn").innerText = "Aggiorna Prodotto";
            document.getElementById("submitBtn").setAttribute("onclick", `updateProduct('${productId}')`);
        } catch (error) {
            console.error(error);
            alert("Errore nel caricamento del prodotto.");
        }
    }
}

async function updateProduct(productId) {
    const updatedProduct = {
        name: document.getElementById("productName").value,
        description: document.getElementById("productDescription").value,
        brand: document.getElementById("productBrand").value,
        imageUrl: document.getElementById("productImagine").value,
        price: parseFloat(document.getElementById("productPrice").value)
    };

    try {
        const response = await fetch(`${API_URL}${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },
            body: JSON.stringify(updatedProduct)
        });

        if (response.ok) {
            alert("Prodotto aggiornato con successo!");
            window.location.href = "index.html";
        } else {
            throw new Error("Errore nell'aggiornamento del prodotto");
        }
    } catch (error) {
        console.error(error);
        alert("Errore nell'aggiornamento del prodotto. Riprova!");
    }
}

function editProduct(productId) {
    window.location.href = `backoffice.html?edit=${productId}`;
}

async function loadProductForEditing() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("edit");

    if (productId) {
        try {
            const response = await fetch(`${API_URL}${productId}`, {
                headers: { "Authorization": `Bearer ${TOKEN}` }
            });

            if (!response.ok) throw new Error("Errore nel caricamento del prodotto");

            const product = await response.json();
            document.getElementById("productName").value = product.name;
            document.getElementById("productBrand").value = product.brand;
            document.getElementById("productPrice").value = product.price;
            document.getElementById("productImagine").value = product.imageUrl;
            document.getElementById("productDescription").value = product.description;

            document.getElementById("submitBtn").innerText = "Aggiorna Prodotto";
            document.getElementById("submitBtn").setAttribute("onclick", `updateProduct('${productId}')`);
        } catch (error) {
            console.error(error);
            alert("Errore nel caricamento del prodotto.");
        }
    }
}

async function updateProduct(productId) {
    const updatedProduct = {
        name: document.getElementById("productName").value,
        description: document.getElementById("productDescription").value,
        brand: document.getElementById("productBrand").value,
        imageUrl: document.getElementById("productImagine").value,
        price: parseFloat(document.getElementById("productPrice").value)
    };

    try {
        const response = await fetch(`${API_URL}${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },
            body: JSON.stringify(updatedProduct)
        });

        if (response.ok) {
            alert("Prodotto aggiornato con successo!");
            window.location.href = "index.html";
        } else {
            throw new Error("Errore nell'aggiornamento del prodotto");
        }
    } catch (error) {
        console.error(error);
        alert("Errore nell'aggiornamento del prodotto. Riprova!");
    }
}
