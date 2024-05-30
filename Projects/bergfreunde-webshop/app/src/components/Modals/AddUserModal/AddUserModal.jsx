import React, { useState, useEffect } from "react";
import style from "./AddUserModal.module.css";
import useMutation from "../../../hooks/useMutation";

const AddUserModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    user: "",
    role: "user",
  });
  const [errors, setErrors] = useState({});

  const userMutation = useMutation();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.user) newErrors.user = "Gebruiker is verplicht";
    if (!formData.role) newErrors.role = "Functie is verplicht";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    userMutation.mutate(
      `${import.meta.env.VITE_API_URL}/users/edit/${formData.user}`,
      {
        method: "PATCH",
        data: {
          role: formData.role,
        },
        onSuccess: () => {
          console.log("User updated");
          onClose();
          // temporary or permanent fix
          window.location.reload();
        },
        onError: (error) => {
          console.error("Error updating user:", error);
        },
      }
    );
  };

  return (
    <div className={style.modalOverlay}>
      <div className={style.modal}>
        <h2 className={style.modal__title}>Welke gebruiker wil u toevoegen?</h2>
        <form onSubmit={handleSubmit}>
          <label className={style.form__label} htmlFor="user">
            <select
              className={`${style.form__select} ${
                errors.user ? style.form__select_error : ""
              }`}
              onChange={handleChange}
              name="user"
              id="user"
              value={formData.user}
            >
              <option value="" disabled>
                -- kies een gebruiker --
              </option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.email}
                </option>
              ))}
            </select>
            {errors.user && <div className={style.error}>{errors.user}</div>}
          </label>
          <label className={style.form__label} htmlFor="role">
            <select
              className={`${style.form__select} ${
                errors.role ? style.form__select_error : ""
              }`}
              onChange={handleChange}
              name="role"
              id="role"
              value={formData.role}
            >
              <option value="" disabled>
                -- kies een functie --
              </option>
              <option value="admin">Admin</option>
              <option value="seller">Verkoper</option>
            </select>
            {errors.role && <div className={style.error}>{errors.role}</div>}
          </label>
          <div className={style.modal__buttons}>
            <button
              type="button"
              onClick={onClose}
              className={`${style.modal__button} ${style.no}`}
            >
              Annuleren
            </button>
            <button
              type="submit"
              className={`${style.modal__button} ${style.yes}`}
            >
              Opslaan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
