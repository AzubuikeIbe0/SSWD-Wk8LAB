// This is the product controller

// Import router package
const router = require('express').Router();
const productService = require('../services/productService');


// This endpoint will return all product data from the database
router.get('/', async(req, res) => {

    // set content type of response body in the headers
    // As this is defined globally in app.js it can be ommitted from here
    res.setHeader('Content-Type', 'application/json');

    const result = await productService.getProducts();

    // Send a  response - this app will be a web api so no need to send HTML
    res.json(result);

});

// This endpoint will return a single product by id
// The endpoint is same as for / but with an added :id parameter
router.get('/:id', async(req, res) => {

    // Try to get data and return
    try {
        // Get result from the product service
        // passing the value from req.params.id
        const result = await productService.getProductById(req.params.id);

        // Send a  response
        res.json(result);

    // Handle server errors    
    } catch (err) {
        console.log('GET product/:id - ', err.message);
        res.sendStatus(500);  
    }
});

// Endpoint to handle requests for product by id
// req.query version
// req format: /product/bycat/4
//
router.get("/bycat/:catId", async (req, res) => {
    // read values from req
    const cat_id = req.params.catId;
  
    // If params are missing return 400
    if (typeof cat_id === "undefined") {
      res.statusMessage = "Bad Request - missing cat id";
      res.status(400).json({ content: "Bad Request - missing cat id"});
    }
    // Get products 
    try {
      const result = await productService.getProductsByCatId(cat_id);
  
      // Send response back to client
      res.json(result);
  
      // Catch and send errors
    } catch (err) {
        console.log('GET product/bycat/:catId - ', err.message);
        res.sendStatus(500);  
    }
  });


  // This endpoint will return all product data from the database
// Note that this handles a POST request (router.post)
router.post('/', async(req, res) => {

  // read data request body, this will be the new product
  const new_product = req.body;
  
  // If data missing return 400
  if (typeof new_product === "undefined") {
    
    res.statusMessage = "Bad Request - missing product data";
    res.status(400).json({ content: "Bad Request - missing product data" });
  }
  // log the data to the console
  console.log(`product data sent:\n ${JSON.stringify(new_product)}`);

  // Call productService to create the new product
  try {
    const result = await productService.addNewProduct(new_product);

    // Send response back to client
    res.json(result);

    // Catch and send errors
  } catch (err) {

	  console.log('POST product/ - ', err.message);
    res.sendStatus(500);
  }

});



  // This endpoint updates a product
// Note that this handles a PUT request (router.put)
router.put('/', async(req, res) => {

  // read data request body, this will be the new product
  const update_product = req.body;
  
  // If data missing return 400
  if (typeof update_product === "undefined") {
    res.statusMessage = "Bad Request - missing product data";
    res.status(400).json({ content: "error" }).end();
    return 1;
  }
  // log the data to the console
  console.log(`product data sent:\n ${JSON.stringify(update_product)}`);

  // Call productService to create the new product
  try {
    const result = await productService.updateProduct(update_product);

    // Send response back to client
    res.json(result);

    // Catch and send errors
  } catch (err) {
    console.log('PUT product/ - ', err.message);
    res.sendStatus(500);  
  }

});


// This endpoint will delete a product by id
// The endpoint is same as for /:id but with uses the delete method
router.delete('/:id', async(req, res) => {

  // Try to get data and return
  try {
      // Get result from the product service
      // passing the value from req.params.id
      const result = await productService.deletetProductById(req.params.id);

      // Send a  response
      res.json(result);

  // Handle server errors    
  } catch (err) {
    console.log('DELETE product/:id - ', err.message);
    res.sendStatus(500);  
  }
});

// // This endpoint will update a single product by id
// // The endpoint is same as for / but with an added :id parameter
// router.put('/:id', async(req, res) => {

//   // Try to get data and return
//   try {
//       // Get result from the product service
//       // passing the value from req.params.id
//       const result = await productService.updateProduct(req.params.id);

//       // Send a  response
//       res.send({ message: 'Product has been updated.' });
//       res.json(result);

//   // Handle server errors    
//   } catch (err) {

//       console.log('GET product/:id - ', err.message);

//       res.sendStatus(500);  
//   }
// });

// // This endpoint will delete a single product by id
// // The endpoint is same as for / but with an added :id parameter
// router.delete('/:id', async(req, res) => {

//   // Try to get data and return
//   try {
//       // Get result from the product service
//       // passing the value from req.params.id
//       const result = await productService.deleteProduct(req.params.id);

//       // Send a  response
//       res.send({ message: 'Product has been deleted!' });
//       res.json(result);

//   // Handle server errors    
//   } catch (err) {

//       console.log('GET product/:id - ', err.message);
//       res.sendStatus(500);  
//   }
// });




// export
module.exports = router;
