export const parseRequestUrl = () => {
  const url = document.location.hash.toLocaleLowerCase();
  const [path, queryString] = url.split("?");
  const request = path.replace("#", "").split("/");

  const query = {};

  if (queryString) {
    queryString.split("&").forEach((param) => {
      const [key, value] = param.split("=");
      query[key] = value;
    });
  }
  console.log("Parsed URL:", { resource: request[1], query });
  return {
    resource: request[1],
    id: request[2],
    action: request[3],
    query,
  };
};
