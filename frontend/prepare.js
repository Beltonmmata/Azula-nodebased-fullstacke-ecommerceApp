const router = async () => {
  showLoading();
  const { resource, id, action, query } = parseRequestUrl(); // Get the request data

  // Match routes without considering query parameters
  const parseUrl =
    (resource ? `/${resource}` : "/") +
    (id ? `/${id}` : "") +
    (action ? `/${action}` : "");

  let page = routes[parseUrl];

  // If no exact match is found, check for dynamic routes
  if (!page) {
    Object.keys(routes).forEach((route) => {
      if (route.includes(":")) {
        const baseRoute = route.split("/:")[0]; // Extract "/product" from "/product/:id"
        if (parseUrl.startsWith(baseRoute)) {
          page = routes[route]; // Assign the correct page
        }
      }
    });
  }

  // ✅ Pass query parameters to the matched page
  if (page) {
    const pageHtml = page.render
      ? await page.render(query) // ✅ Pass query params
      : page;
    document.querySelector("#app").innerHTML = pageHtml;

    if (page.afterRender) {
      page.afterRender();
    }
  } else {
    document.querySelector("#app").innerHTML = errorPage.render();
  }

  hideLoading();
};
