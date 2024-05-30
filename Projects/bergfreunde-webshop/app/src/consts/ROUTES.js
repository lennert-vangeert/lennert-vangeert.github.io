const ROUTES = {
  home: "/",
  productList: "/products",
  productDetail: { path: "products/:id", to: "/products/" },
  account: "/account",
  basket: "/basket",
  dashboard: "/dashboard",
  login: "/login",
  register: "/register",
  notFound: "*",
};

export default ROUTES;
