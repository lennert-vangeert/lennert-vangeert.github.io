import React, { useEffect, useState } from "react";
import style from "./ProductDetail.module.css";
import { useProducts } from "../../contexts/ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../../components/NotFound/NotFound";
import ProductQuestionForm from "../../components/ProductQuestionForm/ProductQuestionForm";
import PopUp from "../../components/PopUp/PopUp";
import useMutation from "../../hooks/useMutation";
import { useAuthContext } from "../../contexts/AuthContainer";

const ProductDetail = () => {
  const { id } = useParams();
  const { productData, isLoading } = useProducts();
  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const likeMutation = useMutation();
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    productId: id,
    colour: "",
    size: "",
    amount: 1,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const filteredProducts = productData.filter(
      (product) => product._id === String(id)
    );

    if (filteredProducts.length === 1) {
      const selectedProduct = filteredProducts[0];
      setProduct(selectedProduct);
      setFormData({
        productId: selectedProduct._id,
        colour:
          selectedProduct.colours.length > 0 ? selectedProduct.colours[0] : "",
        size: selectedProduct.sizes.length > 0 ? selectedProduct.sizes[0] : "",
      });
    }
  }, [productData, id]);

  const getLikes = () => {
    if (user) {
      fetch(`${import.meta.env.VITE_API_URL}/likes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setLikes(data);
          console.log(data);
        })
        .catch((error) => {
          navigate("/login");
        });
    }
  };

  useEffect(() => {
    getLikes();
  }, []);

  useEffect(() => {
    if (likes) {
      setIsLiked(likes.some((like) => like.productId === id));
    }
  }, [likes, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = [...existingProducts, formData];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleLike = (id) => {
    if (!user) navigate("/login");
    likeMutation.mutate(`${import.meta.env.VITE_API_URL}/likes`, {
      method: "POST",
      data: {
        userId: user._id,
        productId: id,
      },
      onSuccess: () => {
        console.log("Product liked");
        setLikes((prevLikes) => [
          ...prevLikes,
          { userId: user._id, productId: id },
        ]);
      },
    });
    setIsLiked(true);
  };

  if (isLoading && !productData) return <Loader />;
  else if (!product) return <NotFound />;
  else
    return (
      <div>
        <section className={style.product__section}>
          <img
            className={style.product__image}
            src={`/images/${product.images[0]}`}
          />
          <div className={style.product__secondary_images}>
            {product.images.map((image, index) => {
              if (index === 0) return null;
              return (
                <img
                  className={style.secondary__image}
                  key={index}
                  src={`/images/${image}`}
                />
              );
            })}
          </div>
          <div className={style.product__content}>
            {isLiked ? (
              <svg
                className={style.product__heart}
                xmlns="http://www.w3.org/2000/svg"
                width="31.243"
                height="28.219"
                viewBox="0 0 31.243 28.219"
              >
                <path
                  id="Icon_akar-heart"
                  data-name="Icon akar-heart"
                  d="M10.061,4.5A7.026,7.026,0,0,0,3,11.49C3,14.607,4.236,22,16.4,29.481a1.391,1.391,0,0,0,1.446,0C30.008,22,31.243,14.607,31.243,11.49A7.026,7.026,0,0,0,24.182,4.5c-3.9,0-7.061,4.236-7.061,4.236S13.96,4.5,10.061,4.5Z"
                  transform="translate(-1.5 -3)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  fill="#FF0000"
                />
              </svg>
            ) : (
              <svg
                className={style.product__heart}
                onClick={() => handleLike(product._id)}
                xmlns="http://www.w3.org/2000/svg"
                width="31.243"
                height="28.219"
                viewBox="0 0 31.243 28.219"
              >
                <path
                  id="Icon_akar-heart"
                  data-name="Icon akar-heart"
                  d="M10.061,4.5A7.026,7.026,0,0,0,3,11.49C3,14.607,4.236,22,16.4,29.481a1.391,1.391,0,0,0,1.446,0C30.008,22,31.243,14.607,31.243,11.49A7.026,7.026,0,0,0,24.182,4.5c-3.9,0-7.061,4.236-7.061,4.236S13.96,4.5,10.061,4.5Z"
                  transform="translate(-1.5 -3)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />
              </svg>
            )}

            <h1 className={style.product__title}>{product.name}</h1>
            <div className={style.product__rating}>
              {[...Array(product.rating)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  width="31.309"
                  height="29.656"
                  viewBox="0 0 31.309 29.656"
                >
                  <g id="star" transform="translate(-21.845 -21.748)">
                    <path
                      id="Path_4"
                      data-name="Path 4"
                      d="M37.5,45.209l-8.343,4.37,1.593-9.254L24,33.77l9.328-1.35L37.5,24l4.172,8.42L51,33.77l-6.75,6.555,1.593,9.254Z"
                      fill="#c00"
                      stroke="#c00"
                      strokeWidth="2"
                    />
                  </g>
                </svg>
              ))}
            </div>
            <form>
              <input
                onChange={handleChange}
                type="hidden"
                name="productId"
                value={formData.productId}
              />
              <h3 className={style.product__subtitle}>Kleuren</h3>
              <div className={style.product__colours}>
                {product.colours.map((colour, index) => {
                  const formattedColour =
                    colour.charAt(0).toUpperCase() +
                    colour.slice(1).toLowerCase();
                  return (
                    <label className={style.form__label} key={index}>
                      {formattedColour}
                      <input
                        name="colour"
                        type="radio"
                        value={formattedColour}
                        checked={formData.colour === formattedColour}
                        className={style.product__colour}
                        onChange={handleChange}
                      />
                    </label>
                  );
                })}
              </div>
              <label className={style.form__label}>
                <h3 className={style.product__subtitle}>Maat</h3>
                <select
                  name="size"
                  onChange={handleChange}
                  className={style.product__size}
                  value={formData.size}
                >
                  {product.sizes.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </label>
              <div className={style.product__buttons}>
                <h1 className={style.product__title}>€{product.price}</h1>
                <button
                  onClick={handleSubmit}
                  className={style.product__button}
                >
                  In winkelmand
                </button>
              </div>
            </form>
          </div>
        </section>
        <section className={style.product__specs}>
          <h1 className={style.section__title}>Beschrijving</h1>
          <p className={style.description__content}>{product.description}</p>
        </section>
        <ProductQuestionForm product={product} />
        {showPopup && (
          <PopUp
            text="Product toegevoegd aan winkelmand."
            onClose={handleClosePopup}
          />
        )}
      </div>
    );
};

export default ProductDetail;
