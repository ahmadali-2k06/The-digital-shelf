const asyncWrapper = require("../middlewares/asyncWrapper");
const Product = require("../models/products");
const renderHome = asyncWrapper(async (req, res, next) => {
  const filter = {};
  const {
    name,
    company,
    featured,
    sort,
    fields: select,
    numericFilters,
  } = req.query;
  if (featured) {
    filter.featured = featured === "true" ? true : false;
  }
  if (company) {
    filter.company = { $regex: company, $options: "i" };
  }
  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const input = numericFilters;
    const allnumFilters = input.split(",");

    allnumFilters.forEach((numfilter) => {
      const match = numfilter.match(/(\w+)\s*(>=|<=|>|<|=)\s*(\d+)/);
      if (match) {
        const [, field, operator, value] = match;
        if (
          Product.schema.paths[field] &&
          Product.schema.paths[field].instance === "Number"
        ) {
          const operatorSigns = {
            "=": "$eq",
            ">=": "$gte",
            ">": "$gt",
            "<=": "$lte",
            "<": "$lt",
          };
          const operatorSign = operatorSigns[operator];
          if (!filter[field]) {
            filter[field] = {};
          }
          filter[field][operatorSign] = Number(value);
        }
      }
    });
  }
  let query = Product.find(filter);
  if (sort) {
    let sortparams = sort.split(",").join(" ");
    query = query.sort(sortparams);
  }
  if (select) {
    let selectparams = select.split(",").join(" ");
    query = query.select(selectparams);
  }
  let allProducts = await Product.find(filter);
  const productsNo = allProducts.length;
  let limit = Number(req.query.limit) || 10;
  let page = Number(req.query.page) || 1;
  let skip = (page - 1) * limit;
  let totalPages = Math.ceil(productsNo / limit);
  query = query.skip(skip).limit(limit);
  let products = await query;
  if (!products || products.length === 0) {
    return res.render("index", {
      products: [],
      message: "No products found",
      totalPages: 0,
      currentPage: page || 1,
    });
  }
  if (page && page > totalPages) {
    return res.status(500).json({ result: "Page exceeds the number of pages" });
  }
  res.render("index", {
    products,
    message: null,
    totalPages,
    currentPage: page || 1,
  });
});

module.exports = renderHome;
