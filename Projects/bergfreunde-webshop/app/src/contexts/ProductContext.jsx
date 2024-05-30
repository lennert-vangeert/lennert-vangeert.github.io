import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then((response) => response.json())
      .then((data) => setProductData(data))
      .catch((err) => setErrors(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ productData, isLoading, errors }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

export const useProducts = () => useContext(ProductContext);
