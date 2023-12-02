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

