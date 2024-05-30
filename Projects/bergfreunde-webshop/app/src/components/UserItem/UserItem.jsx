import React, { useState } from "react";
import style from "./UserItem.module.css";
import EditUserModal from "../Modals/EditUserModal/EditUserModal";
import useMutation from "../../hooks/useMutation";

const UserItem = ({ user }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const editMutation = useMutation();

  const handleEdit = (userID, formData) => {
    editMutation.mutate(
      `${import.meta.env.VITE_API_URL}/users/edit/${userID}`,
      {
        method: "PATCH",
        data: formData,
        headers: {
          "Content-Type": "application/json",
        },
      },
      {
        onError: (error) => {
          console.error("Error updating user:", error);
        },
      }
    );
    setModalOpen(false);
  };

  return (
    <div className={style.user}>
      <EditUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onEdit={(formData) => handleEdit(user._id, formData)}
        user={user}
      />
      <div className={style.user__content}>
        <h1 className={style.user__title}>
          {user.firstName} {user.lastName}
        </h1>
        <h2 className={style.user__subtitle}>
          Functie:{" "}
          {user.role === "admin"
            ? "Admin"
            : user.role === "seller"
            ? "Verkoper"
            : "Gebruiker"}
        </h2>
        <p className={style.user__email}>Email: {user.email}</p>
      </div>
      <div className={style.button__container}>
        <button onClick={handleOpenModal} className={style.user__button}>
          Aanpassen
        </button>
      </div>
    </div>
  );
};

export default UserItem;
