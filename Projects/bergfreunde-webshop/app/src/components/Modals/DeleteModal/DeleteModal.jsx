import React from "react";
import style from "./DeleteModal.module.css";

const DeleteModal = ({ text, isOpen, onClose, onDelete }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className={style.modalOverlay}>
      <div className={style.modal}>
        <h2 className={style.modal__title}>
          Ben je zeker dat je dit {text} wilt verwijderen?
        </h2>
        <div className={style.modal__buttons}>
          <button onClick={onClose} className={`${style.modal__button} ${style.no}`}>
            Nee
          </button>
          <button onClick={onDelete} className={`${style.modal__button} ${style.yes}`}>
            Ja
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
