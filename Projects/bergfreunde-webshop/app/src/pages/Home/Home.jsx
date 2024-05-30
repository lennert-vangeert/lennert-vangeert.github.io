import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import { useProducts } from "../../contexts/ProductContext";
import ProductHighlight from "../../components/ProductHighlight/ProductHighlight";
import Loader from "../../components/Loader/Loader";
import Mapbox from "../../components/Mapbox/Mapbox";

const Home = () => {
  const { productData, isLoading, errors } = useProducts();

  return (
    <div>
      <section className={style.hero}>
        <div className={style.hero__content}>
          <h1 className={style.hero__title}>
            Berg <br /> freunde
          </h1>
        </div>
      </section>

      {productData.length ? (
        <ProductHighlight
          product={productData[Math.floor(Math.random() * productData.length)]}
        />
      ) : (
        <Loader />
      )}

      <section className={style.contact}>
        <h1 className={style.contact__title}>Contactgegevens</h1>
        <div className={style.contact__flex}>
          <div className={style.contact__text_container}>
            <div>
              <p className={style.contact__text}>
                Voetweg 66,
                <br /> 9000 Gent <br /> België
              </p>
              <p className={style.contact__text}> +32 478 65 25 45</p>
            </div>
            <div>
              <p className={style.contact__text}>info@bergfreunde.be</p>
              <p className={style.contact__text}>
                Klantenservice: <br /> Maandag tot en met vrijdag: 9:00 - 17:00
                (GMT+1)
              </p>
            </div>
          </div>
          <Mapbox />
        </div>
      </section>
    </div>
  );
};

export default Home;
