const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  try {
    // Пример: фильтрация продуктов с ценой больше 30, сортировка по цене, выбор полей name и price
    const products = await Product.find({ price: { $gt: 30 } })
      .sort("price")
      .select("name price")
      .limit(10); // Ограничиваем количество результатов
    res.status(200).json({ products, nbHits: products.length });
  } catch (error) {
    console.error("Error fetching static products:", error); // Логирование ошибок
    res.status(500).json({ msg: "Error fetching static products", error });
  }
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  // **Фильтр по "featured"**
  if (featured) {
    queryObject.featured = featured === "true";
  }

  // **Фильтр по "company"**
  if (company) {
    queryObject.company = company;
  }

  // **Фильтр по "name"**
  if (name) {
    queryObject.name = { $regex: name, $options: "i" }; // Регистронезависимый поиск
  }

  // **Обработка числовых фильтров**
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;

    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];
    filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        if (!queryObject[field]) queryObject[field] = {};
        queryObject[field][operator] = Number(value);
      }
    });

    console.log("Query Object After Numeric Filters:", queryObject); // Логируем объект после обработки фильтров
  }

  try {
    let result = Product.find(queryObject);

    // **Сортировка**
    if (sort) {
      const sortList = sort.split(",").join(" ");
      result = result.sort(sortList);
    } else {
      result = result.sort("createdAt"); // Сортировка по умолчанию
    }

    // **Выбор полей**
    if (fields) {
      const fieldsList = fields.split(",").join(" ");
      result = result.select(fieldsList);
    }

    // **Пагинация**
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    // **Получение продуктов**
    const products = await result;
    res.status(200).json({ products, nbHits: products.length });
  } catch (error) {
    console.error("Error fetching products:", error); // Логирование ошибок
    res.status(500).json({ msg: "Error fetching products", error });
  }
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
