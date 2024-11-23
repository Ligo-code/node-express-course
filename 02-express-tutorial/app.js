console.log("Express Tutorial");

const express = require("express");
const { products } = require("./data");
const peopleRouter = require("./routes/people");
const app = express();

app.use(express.json());
app.use(express.static("./public"));

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
    next();
};
app.use(logger);

app.use("/api/v1/people", peopleRouter);

app.get("/api/v1/products", (req, res) => {
    try {
        res.json(products);
    } catch (error) {
        console.error("Error in /api/v1/products:", error);
        res.status(500).json();
    }
});

app.get("/api/v1/products/:productID", (req, res) => {
    try {
        const productID = Number(req.params.productID);

        if (isNaN(productID) || productID <= 0) {
            return res.status(400).json({ message: "Invalid product ID. Please provide a valid positive integer." });
        }

        const product = products.find((p) => p.id === productID);
        if (!product) {
            return res.status(404).json({ message: "No product found with the given ID." });
        }

        res.json(product);
    } catch (error) {
        console.error("Error in /api/v1/products/:productID:", error);
        res.status(500).json();
    }
});

app.get("/api/v1/query", (req, res) => {
    try {
        const { search, limit, price } = req.query;
        let filteredProducts = [...products];

        if (search) {
            filteredProducts = filteredProducts.filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (price) {
            const maxPrice = parseFloat(price);
            if (isNaN(maxPrice) || maxPrice < 0) {
                return res.status(400).json({ message: "Invalid price parameter. Please provide a valid non-negative number." });
            }
            filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice);
        }

        if (limit) {
            const parsedLimit = parseInt(limit, 10);
            if (isNaN(parsedLimit) || parsedLimit <= 0) {
                return res.status(400).json({ message: "Invalid limit parameter. Please provide a positive integer." });
            }
            filteredProducts = filteredProducts.slice(0, parsedLimit);
        }

        if (filteredProducts.length === 0) {
            return res.status(404).json({ message: "No products found matching the criteria." });
        }

        res.json(filteredProducts);
    } catch (error) {
        console.error("Error in /api/v1/query:", error);
        res.status(500).json();
    }
});

app.get("/api/v1/test", (req, res) => {
    res.json({ message: "It is working!" });
});

app.all("*", (req, res) => {
    res.status(404).send("Page not found");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong on the server." });
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
