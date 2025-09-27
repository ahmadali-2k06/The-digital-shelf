let priceSlider = document.getElementById("price-bar");
let priceFilter = document.querySelector(".variable-price");
let featuredCheck = document.getElementById("featured-check");
let companySelect = document.getElementById("company-select");
let priceBar = document.getElementById("price-bar");
let priceText = document.querySelector(".variable-price");
let sortSelectPrice = document.getElementById("sort-select-price");
let sortSelectName = document.getElementById("sort-select-name");
let resetButton = document.querySelector(".reset-text");
let searchProducts = document.getElementById("search");
let sortSelect = [sortSelectPrice, sortSelectName];
let params = new URLSearchParams(window.location.search);

priceSlider.addEventListener("input", () => {
  let price = priceSlider.value;
  priceFilter.textContent = `PKR ${price.toLocaleString()}`;
});

priceSlider.addEventListener("change", () => {
  let price = priceSlider.value;
  params.set("numericFilters", `price<=${price}`);
  window.location.search = params.toString();
});

window.addEventListener("DOMContentLoaded", () => {
  if (params.get("featured") === "true") {
    featuredCheck.checked = true;
  }
  if (params.has("company")) {
    companySelect.value = params.get("company");
  }
  if (params.has("numericFilters")) {
    let filter = params.get("numericFilters");
    if (filter.includes("price<=")) {
      let price = filter.split("price<=")[1];
      priceSlider.value = price;
      priceText.textContent = `PKR ${parseInt(price).toLocaleString()}`;
    }
  }
  if (params.has("sort")) {
    let sorts = params.get("sort").split(",");

    sortSelect.forEach((element) => {
      let field = element.dataset.sortField;
      let matched = sorts.find((s) => s === field || s === `-${field}`);
      if (matched) {
        element.value = matched;
      } else {
        element.value = "relevance";
      }
    });
  } else {
    sortSelect.forEach((element) => {
      element.value = "relevance";
    });
  }
});

featuredCheck.addEventListener("change", () => {
  if (featuredCheck.checked) {
    params.set("featured", true);
  } else {
    params.delete("featured");
  }
  window.location.search = params.toString();
});

companySelect.addEventListener("change", () => {
  let companyName = companySelect.value;
  if (companyName !== "All+Brands") {
    params.set("company", companyName.toString());
  } else {
    params.delete("company");
  }

  window.location.search = params.toString();
});

sortSelect.forEach((element) => {
  element.addEventListener("change", () => {
    let existingSorts = params.get("sort") ? params.get("sort").split(",") : [];
    let field = element.dataset.sortField;
    existingSorts = existingSorts.filter(
      (s) => s !== field && s !== `-${field}`
    );
    if (element.value !== "relevance") {
      existingSorts.push(element.value);
    }
    if (existingSorts.length > 0) {
      params.set("sort", existingSorts.join(","));
    } else {
      params.delete("sort");
    }

    window.location.search = params.toString();
  });
});

resetButton.addEventListener("click", () => {
  window.location.search = "";
});

searchProducts.addEventListener("change", (e) => {
  params = new URLSearchParams();
  let userInput = searchProducts.value.trim();
  let regex = new RegExp(`^${userInput}$`, "i");
  let companies = ["samsung", "google", "apple", "one Plus"];
  let match = companies.find((c) => c.replace(/\s+/g, "").match(regex));
  if (match) {
    params.set("company", match);
  } else {
    params.set("name", userInput);
  }
  window.location.search = params.toString();
});

