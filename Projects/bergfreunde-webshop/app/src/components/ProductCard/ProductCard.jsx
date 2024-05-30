import React, { useState } from "react";
import style from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/ROUTES";
import DeleteModal from "../Modals/DeleteModal/DeleteModal";
import useMutation from "../../hooks/useMutation";
import EditProductModal from "../Modals/EditProductModal/EditProductModal";

const ProductCard = ({ product, settings, likeId = null }) => {
  const deleteMutation = useMutation();
  const editMutation = useMutation();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleOpenDeleteModal = () => setDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const handleOpenEditModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);

  const handleDelete = (productID, likeId = null) => {
    if (settings.deleteLike) {
      console.log(likeId);
      deleteMutation.mutate(`${import.meta.env.VITE_API_URL}/likes/${likeId}`, {
        method: "DELETE",
        onSuccess: () => {
          console.log("Like deleted");
        },
      });
    } else {
      deleteMutation.mutate(
        `${import.meta.env.VITE_API_URL}/products/${productID}`,
        {
          method: "DELETE",
          onSuccess: () => {
            console.log("Product deleted");
          },
        }
      );
      setDeleteModalOpen(false);
    }

    // temporary or permanent fix
    window.location.reload();
  };

  const handleEdit = (productID, formData) => {
    editMutation.mutate(
      `${import.meta.env.VITE_API_URL}/products/${productID}`,
      {
        method: "PATCH",
        data: formData,
      },
      {
        onSuccess: () => {
          console.log("Product updated");
        },
        onError: (error) => {
          console.error("Error updating product:", error);
        },
      }
    );

    setEditModalOpen(false);
    // temporary or permanent fix
    window.location.reload();
  };

  return (
    <div className={style.outer__card}>
      <DeleteModal
        text="product"
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={() => handleDelete(product._id, likeId)}
      />
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onEdit={(formData) => handleEdit(product._id, formData)}
        product={product}
      />
      <div className={style.card}>
        {settings && settings.deleteButton ? (
          <svg
            onClick={handleOpenDeleteModal}
            className={`${style.delete__button} ${style.absolute__button}`}
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
        ) : null}

        {settings && settings.editButton ? (
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
        ) : null}
        <Link to={`${ROUTES.productDetail.to}${product._id}`}>
          <div className={style.image__container}>
            <img
              className={style.card__image}
              src={`/images/${product.images[0]}`}
            />
          </div>
          <div className={style.card__content}>
            <h2 className={style.card__name}>{product.name}</h2>
            <p className={style.card__text}>{product.brand}</p>
            <p className={style.card__text}>€ {product.price}</p>
            <div className={style.rating__container}>
              {[...Array(product.rating)].map((_, index) => {
                return (
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
                );
              })}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
