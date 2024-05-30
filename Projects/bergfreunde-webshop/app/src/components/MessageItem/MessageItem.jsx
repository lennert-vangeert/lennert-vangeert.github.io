import React, { useState } from "react";
import style from "./MessageItem.module.css";
import { useProducts } from "../../contexts/ProductContext";
import Loader from "../Loader/Loader";
import useMutation from "../../hooks/useMutation";
import DeleteModal from "../Modals/DeleteModal/DeleteModal";

const MessageItem = ({ message, fetchMessages }) => {
  const { productData, isLoading, errors } = useProducts();
  const deleteMutation = useMutation();
  const isReadMutation = useMutation();
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleDelete = (messageId) => {
    deleteMutation.mutate(
      `${import.meta.env.VITE_API_URL}/messages/${messageId}`,
      {
        method: "DELETE",
        onSuccess: () => {
          console.log("Message deleted");
          fetchMessages();
        },
      }
    );
    setModalOpen(false);
  };
  const handleRead = (messageId) => {
    isReadMutation.mutate(
      `${import.meta.env.VITE_API_URL}/messages/${messageId}`,
      {
        method: "PATCH",
        data: { isRead: !message.isRead },
        onSuccess: () => {
          console.log("Message updated");
          fetchMessages();
        },
      }
    );
  };
  if (isLoading) {
    return <Loader />;
  } else if (errors) {
    return <p>Er is iets misgegaan: {errors.message}</p>;
  } else
    return (
      <div className={style.message}>
        <DeleteModal
          text="bericht"
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onDelete={() => handleDelete(message._id)}
        />
        {message.isRead ? (
          ""
        ) : (
          <svg
            className={style.message__exclamation}
            xmlns="http://www.w3.org/2000/svg"
            width="27.923"
            height="31.5"
            viewBox="0 0 27.923 31.5"
          >
            <g
              id="Icon_core-bell-exclamation"
              data-name="Icon core-bell-exclamation"
              transform="translate(-4.038 -2.25)"
            >
              <path
                id="Path_56"
                data-name="Path 56"
                d="M31.758,24.509,28.688,18.84v-5.9a10.688,10.688,0,0,0-21.375,0v5.9L4.242,24.509A1.688,1.688,0,0,0,5.726,27h6.113q-.026.28-.026.562a6.188,6.188,0,1,0,12.375,0c0-.19-.009-.377-.026-.562h6.113a1.688,1.688,0,0,0,1.484-2.491Zm-9.821,3.054A3.938,3.938,0,1,1,14.1,27H21.9A3.927,3.927,0,0,1,21.938,27.563ZM6.67,24.75l2.892-5.34V12.938a8.437,8.437,0,1,1,16.875,0V19.41l2.892,5.34Z"
                fill="#c00"
              />
              <path
                id="Path_57"
                data-name="Path 57"
                d="M16.875,7.875h2.25v9.563h-2.25Zm0,11.813h2.25v2.25h-2.25Z"
                fill="#c00"
              />
            </g>
          </svg>
        )}

        <div className={style.message__content}>
          <h1 className={style.message__title}>
            {message.senderName} {message.senderLastName}
          </h1>
          <h2 className={style.message__subtitle}>
            {
              productData.find((product) => product._id === message.productId)
                .name
            }
          </h2>
          <p className={style.message__content}>{message.message} </p>
        </div>
        <div className={style.button__container}>
          <button
            onClick={handleOpenModal}
            className={`${style.message__button} ${style.delete__button}`}
          >
            Verwijderen
          </button>
          <button
            onClick={() => handleRead(message._id)}
            className={`${style.message__button} ${style.read__button}`}
          >
            {message.isRead ? "Als ongelezen markeren" : "Als gelezen markeren"}
          </button>
        </div>
      </div>
    );
};

export default MessageItem;
