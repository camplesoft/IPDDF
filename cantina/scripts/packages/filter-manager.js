"use strict";

class FilterManager {
  constructor(products) {
    this.products = products;
    this.filters = [];
    this.filteredProducts = [...products];
  }

  addFilter(filterFn) {
    this.filters.push(filterFn);
    this.applyFilters();
  }

  removeFilter(filterFn) {
    this.filters = this.filters.filter((fn) => fn !== filterFn);
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProducts = this.products;
    this.filters.forEach((filterFn) => {
      this.filteredProducts = this.filteredProducts.filter(filterFn);
    });
  }

  sort(order) {
    switch (order) {
      case "A-Z":
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        this.filteredProducts.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case "price-desc":
        this.filteredProducts.sort((a, b) => b.currentPrice - a.currentPrice);
        break;
      default:
        throw new Error("Invalid sort order");
    }
  }

  getProducts() {
    return this.filteredProducts;
  }

  updateProducts(newProducts) {
    this.products = newProducts;
    this.applyFilters();
  }
}

export { FilterManager };
