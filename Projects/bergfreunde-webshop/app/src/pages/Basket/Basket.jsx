import React, { useEffect, useState } from "react";
import style from "./Basket.module.css";
import Loader from "../../components/Loader/Loader";
import { useProducts } from "../../contexts/ProductContext";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/ROUTES";
import useMutation from "../../hooks/useMutation";
import { useAuthContext } from "../../contexts/AuthContainer";
import PopUp from "../../components/PopUp/PopUp";

const Basket = () => {
  const { productData, isLoading, errors } = useProducts();
  const { user } = useAuthContext();
  const [items, setItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const orderMutation = useMutation();
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("products")) || [];
    setItems(
      storedItems.map((item) => ({ ...item, amount: item.amount || 1 }))
    );
  }, []);

  if (isLoading) {
    return <Loader />;
  } else if (errors) {
    return <p>Something went wrong</p>;
  }

  const calculateTotal = () => {
    return items.reduce((acc, item) => {
      const product = productData.find(
        (product) => product._id === item.productId
      );
      return (
        Math.round((product ? acc + product.price * item.amount : acc) * 100) /
        100
      );
    }, 0);
  };

  const handleOrderPlaced = () => {
    orderMutation.mutate(
      `${import.meta.env.VITE_API_URL}/orders`,
      {
        method: "POST",
        data: {
          userId: user._id,
          products: items.map((item) => ({
            productId: item.productId,
            quantity: item.amount,
            colour: item.colour,
            size: item.size,
          })),
          total: calculateTotal(),
          address: {
            street: user.address.street,
            city: user.address.city,
            zip: user.address.zip,
          },
        },
      },
      {
        onSuccess: () => {
          console.log("Order placed");
          clearBasket();
        },
        onError: (error) => {
          console.error("Error placing order:", error);
        },
      }
    );
    setShowPopup(true);
    localStorage.removeItem("products");
    setItems([]);
  };

  const handleChangeAmount = (e, productId, productSize, productColour) => {
    const newItems = items.map((item) =>
      item.productId === productId &&
      item.size === productSize &&
      item.colour === productColour
        ? { ...item, amount: e.target.value }
        : item
    );
    setItems(newItems);
    localStorage.setItem("products", JSON.stringify(newItems));
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDeleteItem = (productId, productSize, productColour) => {
    const newItems = items.filter(
      (item) =>
        item.productId !== productId ||
        item.size !== productSize ||
        item.colour !== productColour
    );
    setItems(newItems);
    localStorage.setItem("products", JSON.stringify(newItems));
  };

  return (
    <section className={style.basket}>
      {showPopup && (
        <PopUp text="Uw bestelling is geplaatst!" onClose={handleClosePopup} />
      )}
      <h1 className={style.basket__title}>Winkelmand</h1>
      <div className={style.basket__list}>
        <div className={style.basket__titles}>
          <h2>Product</h2>
          <h2></h2>
          <h2>Aantal</h2>
          <h2>Maat & Kleur</h2>
          <h2>Prijs</h2>
        </div>
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index}>
              {productData
                .filter((product) => product._id === item.productId)
                .map((product) => (
                  <div className={style.basket__item} key={product._id}>
                    <div className={style.image__container}>
                      <img
                        className={style.item__image}
                        src={`/images/${product.images[0]}`}
                        alt={product.name}
                      />
                    </div>
                    <h2>
                      {product.name} <br />
                      <span className={style.item__brand}>{product.brand}</span>
                    </h2>
                    <div>
                      <input
                        type="number"
                        value={item.amount}
                        onChange={(e) =>
                          handleChangeAmount(
                            e,
                            item.productId,
                            item.size,
                            item.colour
                          )
                        }
                      />
                    </div>
                    <div>
                      <p>Maat: {item.size}</p>
                      <p>Kleur: {item.colour}</p>
                    </div>
                    <div>
                      <p className={style.item__price}>
                        € {Math.round(product.price * item.amount * 100) / 100}
                      </p>
                    </div>
                    <svg
                      onClick={() =>
                        handleDeleteItem(item.productId, item.size, item.colour)
                      }
                      className={style.delete__icon}
                      xmlns="http://www.w3.org/2000/svg"
                      width="42"
                      height="42"
                      viewBox="0 0 42 42"
                    >
                      <path
                        id="Icon_akar-trash-can"
                        data-name="Icon akar-trash-can"
                        d="M6.9,10.8H38.1L35.019,38.529A3.9,3.9,0,0,1,31.142,42H13.858a3.9,3.9,0,0,1-3.877-3.471Zm6.523-5.563A3.9,3.9,0,0,1,16.95,3h11.1a3.9,3.9,0,0,1,3.53,2.237L34.2,10.8H10.8ZM3,10.8H42M18.6,20.55V30.3m7.8-9.75V30.3"
                        transform="translate(-1.5 -1.5)"
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                ))}
            </div>
          ))
        ) : (
          <p>Uw winkelmand is leeg</p>
        )}
        <div className={style.basket__item}>
          <h2>Totaal</h2>
          <h2></h2>
          <h2></h2>
          <h2></h2>
          <h2>€ {calculateTotal()}</h2>
        </div>
        <div className={style.button__container}>
          <Link
            className={style.basket__button_secondary}
            to={ROUTES.productList}
          >
            Verder winkelen
          </Link>
          <button className={style.basket__button} onClick={handleOrderPlaced}>
            Afrekenen
          </button>
        </div>
      </div>
    </section>
  );
};

export default Basket;
