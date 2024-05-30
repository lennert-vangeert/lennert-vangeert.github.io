import React, { useState } from "react";
import style from "./ProductQuestionForm.module.css";
import { useAuthContext } from "../../contexts/AuthContainer";
import useMutation from "../../hooks/useMutation";
import PopUp from "../PopUp/PopUp";

const ProductQuestionForm = ({ product }) => {
  const { user } = useAuthContext();
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    senderId: user ? user._id : "",
    senderName: user ? user.firstName : "",
    senderLastName: user ? user.lastName : "",
    receiverId: product.userId,
    productId: product._id,
    message: "",
  });
  const [emptyField, setEmptyField] = useState(false);
  const [errors, setErrors] = useState({});
  const questionMutation = useMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.message) newErrors.message = "Vraag is verplicht";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    questionMutation.mutate(`${import.meta.env.VITE_API_URL}/messages`, {
      method: "POST",
      data: formData,
      onSuccess: () => {
        console.log("Question sent");
        setShowPopup(true);
        setEmptyField(true);
        setFormData((prevFormData) => ({
          ...prevFormData,
          message: "",
        }));
      },
    });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <section className={style.product__question}>
      <h1 className={style.section__title}>Ik heb een vraag</h1>
      <form className={style.question__form} onSubmit={handleSubmit}>
        <label className={style.form__label} htmlFor="message">
          Vraag:
          <textarea
            id="message"
            name="message"
            className={style.question__input}
            placeholder="Stel hier je vraag"
            onChange={handleChange}
            value={formData.message}
          ></textarea>
          {errors.message && (
            <div className={style.error}>{errors.message}</div>
          )}
        </label>
        <button type="submit" className={style.form__button}>
          Verstuur
        </button>
      </form>
      {showPopup && (
        <PopUp text="Bericht verstuurd." onClose={handleClosePopup} />
      )}
    </section>
  );
};

export default ProductQuestionForm;
