import React from "react";
import style from "./ProductHighLight.module.css";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/ROUTES.js";

const ProductHighlight = ({ product }) => {
  return (
    <section className={style.highlight}>
      <h1 className={style.title}>Uitgelicht product</h1>
      <div className={style.highlight__content}>
        <img
          className={style.content__image}
          src={`/images/${product.images[0]}`}
        />
        <div className={style.content__text}>
          <div>
            <h2 className={style.product__title}>{product.name}</h2>
            <p className={style.product__description}>{product.description}</p>
          </div>
          <div className={style.button__container}>
            <Link className={style.main__button} to={`${ROUTES.productDetail.to}${product._id}`}>
              Ontdek meer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHighlight;
