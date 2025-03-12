document.getElementById("addProductBtn").addEventListener("click", addProduct);
document.getElementById("addRowBtn").addEventListener("click", addRowElement);

let rowsCounter = 1;
let productsCounter = 1;

const productTemplate = {
  name: "Producto",
  imageUrl: "https://picsum.photos/200",
  price: "12.95 EUR",
};

const rowsContainer = document.getElementById("rowsContainer");

function addProduct() {
  addProductToRow(productTemplate);
}

function addProductToRow(product) {
  const row = document.getElementById(`row${rowsCounter - 1}`);
  if (!row) return;

  const productsContainer = row.querySelector(".products");
  if (productsContainer.children.length < 3) {
    const productDiv = createProductElement(product);
    productsContainer.appendChild(productDiv);
  } else {
    alert("You cannot have more than 3 products per row");
  }
}

function createProductElement(product) {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");

  productDiv.innerHTML = `
    <img src="${product.imageUrl}" alt="${product.name}">
    <div class="info">
      <div>
        <p>${product.name}</p>
        <p>${product.price}</p>
      </div>
      <button onclick="removeProduct(this)">Eliminar</button>
    </div
  `;
  return productDiv;
}

function removeProduct(button) {
  button.parentElement.remove();
}

function removeRow(row) {
  row.parentElement.parentElement.remove();
}

function addRowElement() {
  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row");
  rowDiv.setAttribute("id", `row${rowsCounter++}`);
  rowDiv.innerHTML = `
    <div class="selectors">
        <select onchange="changeAlignment(this)">
          <option value="left" selected>Izquierda</option>
          <option value="center">Centro</option>
          <option value="right">Derecha</option>
        </select>
        <button onclick="removeRow(this)">Eliminar Fila</button>
    </div>
    <div class="products"></div>
  `;

  rowsContainer.appendChild(rowDiv);
}

function changeAlignment(select) {
  console.log(select);
  const row = select.closest(".row");
  row.className = `row ${select.value}`;
}
