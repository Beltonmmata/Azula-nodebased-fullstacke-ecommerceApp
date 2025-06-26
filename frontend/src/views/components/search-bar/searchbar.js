import "./searchbar.css";

const searchBar = {
  render() {
    return `
      <div class="searchbar-container container">
        

        <!-- Search Form -->
        <form class="searchbar-form">
          <input type="text" id="search-bar-input" placeholder="Search here" />
          <button id="searchbar-btn" type="submit">
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </form>
        <div class="lower-filters">
          <!-- Category Select -->
          <div class="searchbar-category">
            <select id="category-selector">
              <option value="All" selected>Category</option>
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <!-- Sort Select -->
          <div class="searchbar-sort">
            <select id="sort-selector">
              <option value="">Sort by</option>
              <option value="priceIs">Price: Low to High</option>
              <option value="-priceIs">Price: High to Low</option>
              <option value="createdAt">Newest</option>
            </select>
          </div>
        </div>
      </div>
    `;
  },

  afterRender() {
    const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);

    // Prefill existing sort if present
    const sortSelector = document.getElementById("sort-selector");
    if (urlParams.get("sort")) {
      sortSelector.value = urlParams.get("sort");
    }

    // Immediate category change handler
    document
      .getElementById("category-selector")
      .addEventListener("change", (e) => {
        const selected = e.target.value.toLowerCase();
        const search = urlParams.get("search") || "";
        const sort = urlParams.get("sort") || "";
        const currentPage = urlParams.get("page") || "1";

        let query = [`page=${currentPage}`];
        if (search) query.push(`search=${search}`);
        if (selected && selected !== "all") query.push(`category=${selected}`);
        if (sort) query.push(`sort=${sort}`);

        document.location.hash = `/shop?${query.join("&")}`;
      });

    // Search submit handler
    document
      .querySelector(".searchbar-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const category = document
          .getElementById("category-selector")
          .value.toLowerCase();
        const search = document
          .getElementById("search-bar-input")
          .value.trim()
          .replace(/\s+/g, "+");
        const sort = urlParams.get("sort") || "";
        const currentPage = urlParams.get("page") || "1";

        let query = [`page=${currentPage}`];
        if (search) query.push(`search=${search}`);
        if (category && category !== "all") query.push(`category=${category}`);
        if (sort) query.push(`sort=${sort}`);

        document.location.hash = `/shop?${query.join("&")}`;
      });

    // Sort dropdown handler
    sortSelector.addEventListener("change", (e) => {
      const newSort = e.target.value;
      if (newSort) urlParams.set("sort", newSort);
      else urlParams.delete("sort");
      document.location.hash = `/shop?${urlParams.toString()}`;
    });
  },
};

export default searchBar;
