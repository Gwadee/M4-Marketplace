const DATABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzE3NWZjMzNkYmUxNDAwMTUxNTRkMjQiLCJpYXQiOjE3MzAxMDQxODgsImV4cCI6MTczMTMxMzc4OH0.5vycEzGRbC7QGyFkHREKCfm0G0LmrAEAzBdeoaE2g3w";

const DATABASE_AUTH = "Bearer " + DATABASE_KEY;
const DATABASE_URL = "https://striveschool-api.herokuapp.com/api/product/";

const productForm = document.getElementById("productForm");
const formParent = document.getElementById("formParent");

productForm.addEventListener("submit", callbackSubmitForm);

async function callbackSubmitForm(event) {
  event.preventDefault();
  const formElementsArray = Array.from(event.target);
  const [name, brand, price, imageUrl, description] =
    extractValues(formElementsArray);

  console.log(
    JSON.stringify({
      name,
      brand,
      price,
      imagineUrl,
      description,
    })
  );
  const response = await fetch(DATABASE_URL, { 
    method: "POST",
    headers: { Authorization: DATABASE_AUTH },
    body: JSON.stringify({ 
      name,
      brand,
      price,
      imageUrl,
      description,
    }),
  });


function refreshForm() {
  formParent.removeChild(productForm);
  formParent.innerHTML = "Product Sent";
  setTimeout(() => location.reload(), 2000);
}

function extractValues(elementsArray) {
  return elementsArray.map(function (element) {
    return element.value;
  });
}

function callbackSubmitFormAlternate(event) {
  event.preventDefault();
  const formValues = {};
  console.log(event.target[0].labels[0].htmlFor, event.target[0].value);
  formValues[event.target[0].labels[0].htmlFor] = event.target[1].value;
  console.log(formValues);
}