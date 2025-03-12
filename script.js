document.getElementById("addProductBtn").addEventListener("click", addProduct);
document.getElementById("addRowBtn").addEventListener("click", addRowElement);
document.getElementById("zoomInBtn").addEventListener("click", zoomIn);
document.getElementById("zoomOutBtn").addEventListener("click", zoomOut);

let rowsCounter = 1;
let productsCounter = 1;
let zoomLevel = 1;

function zoomIn() {
  zoomLevel += 0.1;
  document.getElementById("editor").style.transform = `scale(${zoomLevel})`;
}

function zoomOut() {
  zoomLevel = Math.max(0.5, zoomLevel - 0.1);
  document.getElementById("editor").style.transform = `scale(${zoomLevel})`;
}

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
  productDiv.draggable = true;
  productDiv.ondragstart = dragStart;
  productDiv.ondragover = allowDrop;
  productDiv.ondrop = dropProduct;
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
  rowDiv.draggable = true;
  rowDiv.ondragstart = dragStart;
  rowDiv.ondragover = allowDrop;
  rowDiv.ondrop = dropRow;
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
  const row = select.closest(".row");
  row.className = `row ${select.value}`;
}

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id);
  // event.dataTransfer.setData(
  //   "text/plain",
  //   event.target.dataset.id || event.target.innerText
  // );
  // event.dataTransfer.setData("type", event.target.className);
}

function allowDrop(event) {
  event.preventDefault();
}

function dropProduct(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(data));
  // const type = event.dataTransfer.getData("type");
  // if (type.includes("product")) {
  //   const data = event.dataTransfer.getData("text/plain");
  //   const newElement = document.createElement("div");
  //   newElement.className = "product";
  //   newElement.draggable = true;
  //   newElement.innerText = data;
  //   newElement.ondragstart = dragStart;
  //   event.target.appendChild(newElement);
  // }
}

function dropRow(event) {
  event.preventDefault();
  const type = event.dataTransfer.getData("type");
  if (type.includes("row")) {
    const data = event.dataTransfer.getData("text/plain");
    const draggedRow = document.querySelector(`[data-id='${data}']`);
    event.target.parentNode.insertBefore(draggedRow, event.target.nextSibling);
  }
}

// function zoomIn() {
//   const editor = document.getElementById("editor");
//   const currentScale = getComputedStyle(editor).transform;
//   const scale =
//     currentScale === "none"
//       ? 1.2
//       : parseFloat(currentScale.split(",")[0].slice(6)) + 0.1;
//   editor.style.transform = `scale(${scale})`;
// }

// function zoomOut() {
//   const editor = document.getElementById("editor");
//   const currentScale = getComputedStyle(editor).transform;
//   const scale =
//     currentScale === "none"
//       ? 0.8
//       : parseFloat(currentScale.split(",")[0].slice(6)) - 0.1;
//   editor.style.transform = `scale(${scale})`;
// }
