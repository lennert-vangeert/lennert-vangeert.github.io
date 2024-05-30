import React, { useEffect, useState } from "react";
import style from "./Account.module.css";
import { useAuthContext } from "../../contexts/AuthContainer";
import EditAccountModal from "../../components/Modals/EditAccountModal/EditAccountModal";
import useMutation from "../../hooks/useMutation";
import { useProducts } from "../../contexts/ProductContext";
import ProductCard from "../../components/ProductCard/ProductCard";

const Account = () => {
  const { user, setUser } = useAuthContext();
  const { productData, isLoading, errors } = useProducts();
  const [likes, setLikes] = useState([]);
  const editMutation = useMutation();

  useEffect(() => {
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
        console.log("Likes fetched:", likes);
      })
      .catch((error) => console.error("Error fetching likes:", error));
  }, []);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const handleOpenEditModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);

  const handleEdit = (formData) => {
    fetch(`${import.meta.env.VITE_API_URL}/users/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
        console.log("User edited:", data);
      })
      .catch((error) => console.error("Error editing user:", error)
    );
    handleCloseEditModal();
  };

  return (
    <div>
      <EditAccountModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onEdit={handleEdit}
        user={user}
      />
      <section className={`${style.section} ${style.account}`}>
        <h1 className={style.section__title}>Account</h1>
        <div className={style.account__info}>
          <svg
            onClick={handleOpenEditModal}
            className={`${style.edit__button} ${style.absolute__button}`}
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 42 42"
          >
            <g
              id="Icon_akar-edit"
              data-name="Icon akar-edit"
              transform="translate(-4.5 -3)"
            >
              <path
                id="Path_49"
                data-name="Path 49"
                d="M29.058,10.024l4.859,4.857M32.183,5.746,19.044,18.884a4.859,4.859,0,0,0-1.331,2.482L16.5,27.441l6.075-1.216A4.854,4.854,0,0,0,25.057,24.9L38.2,11.758a4.252,4.252,0,0,0-6.013-6.013Z"
                transform="translate(5.559)"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <path
                id="Path_50"
                data-name="Path 50"
                d="M40.412,30.441v6.882a4.588,4.588,0,0,1-4.588,4.588H10.588A4.588,4.588,0,0,1,6,37.324V12.088A4.588,4.588,0,0,1,10.588,7.5h6.882"
                transform="translate(0 1.588)"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
            </g>
          </svg>
          <p className={style.info__text}>
            <span className={style.info__label}>Voornaam:</span>{" "}
            {user.firstName}
          </p>
          <p className={style.info__text}>
            <span className={style.info__label}>Achternaam:</span>{" "}
            {user.lastName}
          </p>
          <p className={style.info__text}>
            <span className={style.info__label}>Email:</span> {user.email}
          </p>
          <p className={style.info__label}>Adres:</p>
          <p className={style.info__text}>
            <span className={style.info__label_small}>Straat: </span>
            {user.address.street}
          </p>
          <p className={style.info__text}>
            <span className={style.info__label_small}>Stad: </span>
            {user.address.city}
          </p>
          <p className={style.info__text}>
            <span className={style.info__label_small}>Postcode: </span>
            {user.address.zip}
          </p>
          <p className={style.info__text}>
            <span className={style.info__label_small}>Provincie: </span>
            {user.address.state}
          </p>

          {user.role === "admin" || user.role === "seller" ? (
            <p className={style.info__text}>
              <span className={style.info__label}>Functie:</span>{" "}
              {user.role === "admin" ? "Admin" : "Verkoper"}
            </p>
          ) : null}
        </div>
      </section>

      <section className={`${style.section} ${style.like}`}>
        <h1 className={style.section__title}>Favorieten</h1>
        <div className={style.grid}>

          {likes && productData ? (
            likes.map((like, index) => {
              const product = productData.find(
                (product) => product._id === like.productId
              );
              return (
                <ProductCard
                  key={product._id}
                  likeId={like._id}
                  product={product}
                  settings={{
                    deleteButton: true,
                    deleteLike: true,
                  }}
                />
              );
            })
          ) : (
            <p>Je hebt nog geen favorieten toegevoegd.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Account;
