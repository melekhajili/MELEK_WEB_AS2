
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');

// 1. API integration (20pts)
// a. Use JavaScript to fetch data from dummyjson.com about products from /products endpoint.
// b. Handle any potential errors during the fetch operation.

let data; // Declare data globally
async function fetchData() {
  try {
    const response = await fetch('https://dummyjson.com/products');
    data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// 2. Data display (1) (20 pts)
// a. Display the data on the home web page. Each product should include the title, price, discount, category, and stock as well as the thumbnail.
// b. Ensure the display is well-formatted and readable.

function createProductElement(product) {
  const productElement = document.createElement('div');
  productElement.innerHTML = `
    <h3>${product.title}</h3>
    <p>Price: ${product.price}</p>
    <p>Discount: ${product.discount}</p>
    <p>Category: ${product.category}</p>
    <p>Stock: ${product.stock}</p>
    <img src="${product.thumbnail}" alt="${product.title} Thumbnail">
  `;
  productElement.addEventListener('click', () => displayProductInfoPage(product));
  return productElement;
}

function displayDataOnHomePage(data) {
  const productListContainer = document.getElementById('product-list');
  data.products.forEach((product) => {
    const productElement = createProductElement(product);
    productListContainer.appendChild(productElement);
  });
}

// 3. Data display (2) (20 pts)
// a. When a product is clicked a new product info page is opened with the detailed information as well as the gallery of the product.

function displayProductInfoPage(product) {
  console.log('Product Clicked:', product);
}

// 4. Data display (3)
// a. On the home page, provide the following features
// i. Search for a keyword (it can be a part of title, desc, or even category) (15pts)
// ii. Filter based on the given category (all categories are to be provided a sa select box and choosing any category from the list filters the list of all the products) (15 pts)
// b. Use API documentation to explore available ones and their usage.


searchInput.addEventListener('input', () => filterProducts());
categorySelect.addEventListener('change', () => filterProducts());

function filterProducts(page = 1) {
const searchTerm = searchInput.value.toLowerCase();

const filteredProducts = data.products.filter((product) => {
const titleMatch = product.title.toLowerCase().includes(searchTerm);
return titleMatch;
});

displayFilteredProducts(filteredProducts, page);
displayPagination(filteredProducts.length, page);
}

// 5. Apply pagination (Bonus) (10 pts)
// a. If the result of any response holds more than 10 objects, show only 10 products. Implement pagination navigation at the bottom of the list.


const itemsPerPage = 10;
const paginationContainer = document.getElementById('pagination-container');

function displayFilteredProducts(filteredProducts, page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToShow = filteredProducts.slice(startIndex, endIndex);

  const productListContainer = document.getElementById('product-list');
  productListContainer.innerHTML = '';

  productsToShow.forEach((product) => {
    const productElement = createProductElement(product);
    productListContainer.appendChild(productElement);
  });
}

function displayPagination(totalItems, page) {
  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.addEventListener('click', () => filterProducts(i)); 
    paginationContainer.appendChild(pageButton);
  }
}

(async () => {
  try {
    await fetchData();
    displayDataOnHomePage(data);
    filterProducts();
  } catch (error) {
    console.error('Error initializing:', error);
  }
})();