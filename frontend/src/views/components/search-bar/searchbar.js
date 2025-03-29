import "./searchbar.css";
const searchBar = {
  render() {
    return `
        <div id="sarch-box-form-container">
        
            <form class="category-search-filter">
            <div class="category-filter">
              
                  <select name="category-selector" id="category-selector">
                      <option value="All" selected>All</option>
                      <option value="Women">Women</option>
                      <option value="Men">Men</option>
                      <option value="Kids">Kids</option>
                     
                    </select>
              
            </div>
            <input
              type="text"
              placeholder="search here"
              id="search-bar-input"
            />
            <button id="searchbar-btn" type="submit" >             
              <ion-icon name="search-outline"></ion-icon>
            </button>
            </form>
           <div class="category-search-filter">
              <select id="sort-selector">
                  <option value="" selected>Sort by</option>
                  <option value="priceIs">Price: Low to High</option>
                  <option value="-priceIs">Price: High to Low</option>
                  <option value="createdAt">Newest</option>
              </select>
            </div>
          </div>
          
        `;
  },
  afterRender() {
    // Extract existing query parameters
    const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);

    // Set sort dropdown to the current value from the URL
    const sortSelector = document.getElementById("sort-selector");
    if (urlParams.get("sort")) {
      sortSelector.value = urlParams.get("sort");
    }

    // Handle search form submission
    document
      .querySelector(".category-search-filter")
      .addEventListener("submit", (e) => {
        e.preventDefault();

        // Extract input values
        const category =
          document.getElementById("category-selector").value.toLowerCase() ||
          "";
        const search = document
          .getElementById("search-bar-input")
          .value.trim()
          .replace(/\s+/g, "+");
        const sort = urlParams.get("sort");
        const currentPage = urlParams.get("page") || "1"; // Keep current page

        // Build query string
        //let queryParams = new URLSearchParams();
        let queryParams = [];
        if (search) queryParams.push(`search=${search}`);
        if (category && category !== "all")
          queryParams.push(`category=${category}`);
        if (sort) queryParams.push(`sort=${sort}`);
        queryParams.push(`page=${currentPage}`); // Preserve the page number

        // Update URL instantly
        document.location.hash = `/shop?${queryParams.join("&")}`;
      });

    // Handle instant sorting when dropdown is changed
    document.getElementById("sort-selector").addEventListener("change", (e) => {
      const newSort = e.target.value;

      // Preserve existing filters
      if (newSort) {
        urlParams.set("sort", newSort);
      } else {
        urlParams.delete("sort");
      }

      document.location.hash = `/shop?${urlParams.toString()}`;
    });
  },
};
export default searchBar;
