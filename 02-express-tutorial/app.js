console.log("Express Tutorial");

const express = require("express");
const { products } = require("./data");

const app = express();
app.use(express.static("./public"));

console.log("Static files are being served from ./public");

app.get("/api/v1/test", (req, res) => {
    try {
        console.log("GET request to /api/v1/test");
        res.json({ msg: "It worked!" });
    } catch (error) {
        console.error("Error in /api/v1/test:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

app.get("/api/v1/products", (req, res) => {
    try {
        console.log("GET request to /api/v1/products");
        res.json(products);
    } catch (error) {
        console.error("Error in /api/v1/products:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

app.get("/api/v1/products/:productID", (req, res) => {
    try {
        const productID = Number(req.params.productID);
        console.log(`GET request to /api/v1/products/${productID}`);

        if (isNaN(productID) || productID <= 0 || !Number.isInteger(productID)) {
            console.warn(`Invalid product ID: ${req.params.productID}`);
            res.status(400).json({ message: "Invalid product ID. Please provide a valid positive integer." });
            return;
        }

        const product = products.find((p) => p.id === productID);
        if (!product) {
            console.warn(`Product not found: ID ${productID}`);
            res.status(404).json({ message: "Product was not found." });
            return;
        }

        res.json(product);
    } catch (error) {
        console.error(`Error in /api/v1/products/${req.params.productID}:`, error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

app.get("/api/v1/query", (req, res) => {
    try {
        const { search, limit, price } = req.query;
        console.log("GET request to /api/v1/query with query params:", req.query);

        if (price) {
            const parsedPrice = parseFloat(price);
            if (isNaN(parsedPrice) || parsedPrice < 0) {
                console.warn(`Invalid price parameter: ${price}`);
                res.status(400).json({ message: "Invalid price parameter. Please provide a valid non-negative number." });
                return;
            }
        }

        if (limit) {
            const parsedLimit = parseInt(limit, 10);
            if (isNaN(parsedLimit) || parsedLimit <= 0) {
                console.warn(`Invalid limit parameter: ${limit}`);
                res.status(400).json({ message: "Invalid limit parameter. Please provide a positive integer greater than zero." });
                return;
            }
        }

        if (search && typeof search !== "string") {
            console.warn(`Invalid search parameter: ${search}`);
            res.status(400).json({ message: "Invalid search parameter. Please provide a valid string." });
            return;
        }

        let filteredProducts = [...products];

        if (search) {
            console.log(`Filtering products by search term: ${search}`);
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (price) {
            const maxPrice = parseFloat(price);
            console.log(`Filtering products with max price: ${maxPrice}`);
            filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
        }

        if (limit) {
            const resultLimit = parseInt(limit, 10);
            console.log(`Limiting results to: ${resultLimit}`);
            filteredProducts = filteredProducts.slice(0, resultLimit);
        }

        res.json(filteredProducts);
    } catch (error) {
        console.error("Error in /api/v1/query:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

app.all("*", (req, res) => {
    try {
        console.warn(`404 Not Found: ${req.method} ${req.url}`);
        res.status(404).send("Page not found");
    } catch (error) {
        console.error("Error in 404 handler:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
