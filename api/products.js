// ~/api/products.js

// Import products data
const productsData = require('../static/products.json');

// Define a handler for /api/products route
export default function(req, res) {
  try {
    // Set the response header
    res.setHeader('Content-Type', 'application/json');

    // Extract pagination parameters from the query string
    const page = req.query && req.query.page ? parseInt(req.query.page) : 1; // Default to page 1 if not provided
    const limit = req.query && req.query.limit ? parseInt(req.query.limit) : 10; // Default limit to 10 if not provided

    // Calculate start and end indices for pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Slice the products array to get the subset for the current page
    const paginatedProducts = productsData.products.slice(startIndex, endIndex);

    // Construct the response object with paginated products and total count
    const response = {
      products: paginatedProducts,
      total: productsData.total
    };

    // Send the JSON response
    res.statusCode = 200; // Set the status code
    res.end(JSON.stringify(response)); // Send the JSON response
  } catch (error) {
    // Handle errors
    console.error('Error serving products:', error);
    res.statusCode = 500; // Set the status code
    res.end(JSON.stringify({ error: 'Internal Server Error' })); // Send the error response
  }
}
