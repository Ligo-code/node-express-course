console.log("Express Tutorial");

const express = require("express");
const { products } = require("./data");

const app = express(); //  npm start -> http://localhost:3000
app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => { // http://localhost:3000/api/v1/test
    res.json({ msg: "It worked!" });
});

app.get("/api/v1/products", (req, res) => { // http://localhost:3000/api/v1/products
    res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
    const idToFind = parseInt(req.params.productID);
    const product = products.find((p) => p.id === idToFind);
    if (product) {
        res.json(product); // http://localhost:3000/api/v1/products/1 (valid ID)
    } else {
        res.status(404).json({ message: "Product was not found." }); // http://localhost:3000/api/v1/products/1000 (invalid ID)
    }
});

/*
app.get("/api/v1/query", (req, res) => {
    const { search, limit } = req.query;
    let sortedProducts = [...products];

    if (search) {
        sortedProducts = sortedProducts.filter((p) =>
            p.name.startsWith(search)
        );
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, parseInt(limit));
    }
    res.json(sortedProducts);
}); // http://localhost:3000/api/v1/query?search=al&limit=5
*/

app.get("/api/v1/query", (req, res) => {
    const { search, limit, price } = req.query;
    let filteredProducts = [...products];
    
    if (search) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().startsWith(search.toLowerCase())
        );
    } // Filter by search term 

    if (price) {
        const maxPrice = parseFloat(price);
        filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    } // Filter by price

    if (limit) {
        filteredProducts = filteredProducts.slice(0, parseInt(limit));
    } // Limit results

    res.json(filteredProducts);// If no products match the criteria, send an empty array
});

app.all("*", (req, res) => {
    res.status(404).send("Page not found");
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
