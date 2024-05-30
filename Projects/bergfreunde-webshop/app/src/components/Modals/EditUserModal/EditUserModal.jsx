import React, { useState } from "react";
import style from "./EditUserModal.module.css";

const EditUserModal = ({ isOpen, onClose, onEdit }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  const [formData, setFormData] = useState({
    role: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.role) newErrors.role = "Functie is verplicht";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onEdit(formData);
  };

  return (
    <div className={style.modalOverlay}>
      <div className={style.modal}>
        <h2 className={style.modal__title}>
          Welke functie wilt u de gebruiker geven?
        </h2>
        <label className={style.form__label} htmlFor="role">
          <select
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
            <option value="user">Gebruiker</option>
          </select>
          {errors.role && <div className={style.error}>{errors.role}</div>}
        </label>
        <div className={style.modal__buttons}>
          <button
            onClick={onClose}
            className={`${style.modal__button} ${style.no}`}
          >
            Annuleren
          </button>
          <button
            onClick={handleSubmit}
            className={`${style.modal__button} ${style.yes}`}
          >
            Opslaan
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
