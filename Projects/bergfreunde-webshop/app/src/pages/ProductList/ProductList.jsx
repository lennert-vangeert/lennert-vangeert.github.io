import React, { useEffect, useState } from "react";
import style from "./ProductList.module.css";
import { useProducts } from "../../contexts/ProductContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loader from "../../components/Loader/Loader";

const ProductList = () => {
  const { productData, isLoading, errors } = useProducts();
  const [filteredData, setFilteredData] = useState([]);
  const [searchFormData, setSearchFormData] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    categories: new Set(),
    brands: new Set(),
    sex: new Set(),
    sizes: new Set(),
    footShape: new Set(),
    sole: new Set(),
  });
  const [sortOption, setSortOption] = useState("");

  const filter = () => {
    let dataCopy = structuredClone(productData);

    dataCopy = dataCopy.filter((dataItem) => {
      const matchesSearch =
        dataItem.name.toLowerCase().includes(searchFormData.toLowerCase()) ||
        dataItem.brand.toLowerCase().includes(searchFormData.toLowerCase());

      const matchesCategory =
        activeFilters.categories.size === 0 ||
        activeFilters.categories.has(dataItem.category);
      const matchesBrand =
        activeFilters.brands.size === 0 ||
        activeFilters.brands.has(dataItem.brand);
      const matchesSex =
        activeFilters.sex.size === 0 || activeFilters.sex.has(dataItem.sex);
      const matchesSize =
        activeFilters.sizes.size === 0 ||
        dataItem.sizes.some((size) => activeFilters.sizes.has(size));
      const matchesFootShape =
        activeFilters.footShape.size === 0 ||
        activeFilters.footShape.has(dataItem.footShape);
      const matchesSole =
        activeFilters.sole.size === 0 || activeFilters.sole.has(dataItem.sole);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesSex &&
        matchesSize &&
        matchesFootShape &&
        matchesSole
      );
    });

    // Sort the data based on the selected sort option
    if (sortOption === "priceAsc") {
      dataCopy.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceDesc") {
      dataCopy.sort((a, b) => b.price - a.price);
    }

    setFilteredData(dataCopy);
  };

  const handleFilterClick = (filterType, filterValue) => {
    setActiveFilters((prevFilters) => {
      const newFilters = structuredClone(prevFilters);
      if (newFilters[filterType].has(filterValue)) {
        newFilters[filterType].delete(filterValue);
      } else {
        newFilters[filterType].add(filterValue);
      }
      return newFilters;
    });
  };

  const toggleFilterContainer = () => {
    const filterContainer = document.querySelector(
      `.${style.filter__container}`
    );
    filterContainer.classList.toggle(style.filter__visible);
  };

  useEffect(() => {
    if (productData) filter();
  }, [searchFormData, activeFilters, sortOption]);

  useEffect(() => {
    if (!isLoading && !errors) setFilteredData(productData);
  }, [isLoading]);

  if (isLoading) return <Loader />;
  else
    return (
      <div className={style.container}>
        <div className={`${style.filter__hamburger} ${style.outer__hamburger}`}>
          <svg
            onClick={toggleFilterContainer}
            xmlns="http://www.w3.org/2000/svg"
            width="24.75"
            height="22.5"
            viewBox="0 0 24.75 22.5"
          >
            <path
              id="Icon_core-hamburger-menu"
              data-name="Icon core-hamburger-menu"
              d="M5.625,6.75h24.75V9H5.625Zm0,10.125h24.75v2.25H5.625ZM5.625,27h24.75v2.25H5.625Z"
              transform="translate(-5.625 -6.75)"
              fill="#c00"
            />
          </svg>
        </div>
        <section className={style.filter__container}>
          <div className={style.filter__hamburger}>
            <svg
              onClick={toggleFilterContainer}
              xmlns="http://www.w3.org/2000/svg"
              width="24.75"
              height="22.5"
              viewBox="0 0 24.75 22.5"
            >
              <path
                id="Icon_core-hamburger-menu"
                data-name="Icon core-hamburger-menu"
                d="M5.625,6.75h24.75V9H5.625Zm0,10.125h24.75v2.25H5.625ZM5.625,27h24.75v2.25H5.625Z"
                transform="translate(-5.625 -6.75)"
                fill="#c00"
              />
            </svg>
          </div>
          <h1 className={style.filter__title}>Filters</h1>

          <h2 className={style.filter__subtitle}>Sorteer</h2>
          <p
            className={`${style.filter__item} ${
              sortOption === "priceAsc" ? style.active : ""
            }`}
            onClick={() => setSortOption("priceAsc")}
          >
            Prijs oplopend
          </p>
          <p
            className={`${style.filter__item} ${
              sortOption === "priceDesc" ? style.active : ""
            }`}
            onClick={() => setSortOption("priceDesc")}
          >
            Prijs aflopend
          </p>
          <h2 className={style.filter__subtitle}>Categorieën</h2>
          {["Klittenband", "Veters", "Slip-on"].map((category) => (
            <p
              key={category}
              className={`${style.filter__item} ${
                activeFilters.categories.has(category) ? style.active : ""
              }`}
              onClick={() => handleFilterClick("categories", category)}
            >
              {category}
            </p>
          ))}

          <h2 className={style.filter__subtitle}>Merk</h2>
          {["La Sportiva", "Scarpa", "Red Chili", "unParallel", "Boreal"].map(
            (brand) => (
              <p
                key={brand}
                className={`${style.filter__item} ${
                  activeFilters.brands.has(brand) ? style.active : ""
                }`}
                onClick={() => handleFilterClick("brands", brand)}
              >
                {brand}
              </p>
            )
          )}

          <h2 className={style.filter__subtitle}>Geslacht</h2>
          {["Mannen", "Vrouwen", "Unisex"].map((sex) => (
            <p
              key={sex}
              className={`${style.filter__item} ${
                activeFilters.sex.has(sex) ? style.active : ""
              }`}
              onClick={() => handleFilterClick("sex", sex)}
            >
              {sex}
            </p>
          ))}

          <h2 className={style.filter__subtitle}>Maat</h2>
          <div className={style.size__container}>
            {["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"].map(
              (size) => (
                <p
                  key={size}
                  className={`${style.filter__item} ${
                    activeFilters.sizes.has(size) ? style.active : ""
                  }`}
                  onClick={() => handleFilterClick("sizes", size)}
                >
                  {size}
                </p>
              )
            )}
          </div>

          <h2 className={style.filter__subtitle}>Voetvorm</h2>
          {["Egyptisch", "Grieks", "Romeins"].map((footShape) => (
            <p
              key={footShape}
              className={`${style.filter__item} ${
                activeFilters.footShape.has(footShape) ? style.active : ""
              }`}
              onClick={() => handleFilterClick("footShape", footShape)}
            >
              {footShape}
            </p>
          ))}

          <h2 className={style.filter__subtitle}>Zool</h2>
          {["Vibram XS", "Vibram CS", "Trax", "Andere"].map((sole) => (
            <p
              key={sole}
              className={`${style.filter__item} ${
                activeFilters.sole.has(sole) ? style.active : ""
              }`}
              onClick={() => handleFilterClick("sole", sole)}
            >
              {sole}
            </p>
          ))}
        </section>

        <section className={style.product__container}>
          <form className={style.form} action="">
            <input
              type="text"
              placeholder="Search for products"
              className={style.search__input}
              id="search__input"
              name="search__input"
              value={searchFormData}
              onChange={(e) => setSearchFormData(e.currentTarget.value)}
            />
          </form>

          <div className={style.product__grid}>
            {filteredData.length !== 0 ? (
              filteredData.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </section>
      </div>
    );
};

export default ProductList;
