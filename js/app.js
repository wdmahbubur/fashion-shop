const loadProducts = () => {
  // const url = `https://fakestoreapi.com/products`;
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json`; //update api
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.className = "col";
    div.innerHTML = `
    <div class="card h-100 p-3 text-center single-product">
      <img class="product-image card-img-top w-50 m-auto" src=${image}></img>
      <div class="card-body">
        <h3>${product.title}</h3>
        <p>Category: ${product.category}</p>
        <h5>Rating: ${product.rating.rate} (${product.rating.count})</h5>
        <h2>Price: $ ${product.price}</h2>
      </div>
      <div class="card-footer">
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
        <button id="details-btn" class="btn btn-danger" onclick=getSingalProduct(${product.id}); data-bs-toggle="modal" data-bs-target="#detailsModal">Details</button>
      </div>
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
//Count how many add to cart
let count = 0;
//click add cart to execute the function
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

//get value of HTML DOM by id
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

//Get A an singel prodcut details by product id
const getSingalProduct = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(data => showModal(data));
}

//Update modal UI
const showModal = data => {
  const productName = document.getElementById('detailsModalLabel');
  productName.innerText = 'Name: ' + data.title;
  const productDescription = document.getElementById('productDescription');
  productDescription.innerText = 'Description: ' + data.description;
}