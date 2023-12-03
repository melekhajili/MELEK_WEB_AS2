// 1.	API integration (20pts)
// a.	Use JavaScript to fetch data from dummyjson.com about products from / products endpoint.
// b.	Handle any potential errors during the fetch operation.

async function fetchData() {
  try {
    const response = await fetch('https://dummyjson.com/api/products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// 2.	Data display (1) (20 pts)
// a.	Display the data on the home web page. Each product should include the title, price, discount, category, and stock as well as the thumbnail.
// b.	Ensure the display is well-formatted and readable.

function displayDataOnHomePage(data) {
  const productListContainer = document.getElementById('product-list');
  
  data.forEach((product) => {
    const productElement = document.createElement('div');
    productElement.innerHTML = `
      <h3>${product.title}</h3>
      <p>Price: ${product.price}</p>
      <p>Discount: ${product.discount}</p>
      <p>Category: ${product.category}</p>
      <p>Stock: ${product.stock}</p>
      <img src="${product.thumbnail}" alt="${product.title} Thumbnail">
    `;
    productListContainer.appendChild(productElement);
  });
}

// 3.	Data display (2) (20 pts)
// a.	When a product is clicked a new product info page is opened with the detailed information as well as the gallery of the product.

productElement.addEventListener('click', () => {
  displayProductInfoPage(product);
});

function displayProductInfoPage(product) {
  console.log('Product Clicked:', product);
}

// 4.	Data display (3)
// a.	On the home page, provide the following features
// i.	Search for a keyword (it can be a part of title, desc, or even category) (15pts)
// ii.	Filter based on the given category (all categories are to be provided a sa select box and choosing any category from the list filters the list of all the products) (15 pts)
// b.	Use API documentation to explore available ones and their usage.

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value.toLowerCase();

  const filteredProducts = data.filter((product) => {
    const titleMatch = product.title.toLowerCase().includes(searchTerm);
    const categoryMatch =
      product.category.toLowerCase() === selectedCategory || selectedCategory === 'all';

    return titleMatch && categoryMatch;
  });

  displayFilteredProducts(filteredProducts, 1); 
  displayPagination(filteredProducts.length);
}

searchInput.addEventListener('input', filterProducts);
categorySelect.addEventListener('change', filterProducts);

filterProducts();


