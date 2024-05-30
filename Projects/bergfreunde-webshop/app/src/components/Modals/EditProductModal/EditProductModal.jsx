import React, { useState, useEffect } from "react";
import style from "./EditProductModal.module.css";

const EditProductModal = ({ isOpen, onClose, onEdit, product }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    brand: "La Sportiva",
    rating: 1,
    images: ["", "", ""],
    sizes: [],
    colours: [],
    sex: "Mannen",
    footschape: "Egyptisch",
    sole: "Vibram XS",
    category: "Klittenband",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
        brand: product.brand || "La Sportiva",
        rating: product.rating || 1,
        images: product.images || ["", "", ""],
        sizes: product.sizes || [],
        colours: product.colours || [],
        sex: product.sex || "Mannen",
        footschape: product.footschape || "Egyptisch",
        sole: product.sole || "Vibram XS",
        category: product.category || "Klittenband",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("images")) {
      const index = parseInt(name.split("_")[1]);
      setFormData((prev) => {
        const images = [...prev.images];
        images[index] = value;
        return { ...prev, images };
      });
    } else if (type === "checkbox") {
      setFormData((prev) => {
        const updatedArray = prev[name].includes(value)
          ? prev[name].filter((item) => item !== value)
          : [...prev[name], value];
        return { ...prev, [name]: updatedArray };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Naam is verplicht";
    if (!formData.price) newErrors.price = "Prijs is verplicht";
    if (!formData.description)
      newErrors.description = "Beschrijving is verplicht";
    if (!formData.images.every((image) => image))
      newErrors.images = "Alle afbeeldingen zijn verplicht";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onEdit(formData); // Pass the formData to the parent component
  };

  return (
    <div className={style.modalOverlay}>
      <div className={style.modal}>
        <h2 className={style.modal__title}>Product bewerken</h2>
        <form className={style.form} onSubmit={handleSubmit}>
          <label className={style.form__label}>
            Naam:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className={style.error}>{errors.name}</div>}
          </label>
          <label className={style.form__label}>
            Prijs:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            {errors.price && <div className={style.error}>{errors.price}</div>}
          </label>
          <label className={style.form__label}>
            Beschrijving:
            <textarea
              rows={5}
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            {errors.description && (
              <div className={style.error}>{errors.description}</div>
            )}
          </label>
          <label className={style.form__label}>
            Merk:
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            >
              <option value="La Sportiva">La Sportiva</option>
              <option value="Scarpa">Scarpa</option>
              <option value="Red Chili">Red Chili</option>
              <option value="unParallel">unParallel</option>
              <option value="Boreal">Boreal</option>
            </select>
          </label>
          <label className={style.form__label}>
            Afbeeldingen:
            {formData.images.map((image, index) => (
              <input
                key={index}
                type="text"
                name={`images_${index}`}
                value={image}
                onChange={handleChange}
                required
              />
            ))}
            {errors.images && (
              <div className={style.error}>{errors.images}</div>
            )}
          </label>
          <label className={style.form__label}>
            Maten:
            {["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"].map(
              (size) => (
                <label key={size}>
                  <input
                    type="checkbox"
                    name="sizes"
                    value={size}
                    checked={formData.sizes.includes(size)}
                    onChange={handleChange}
                  />
                  {size}
                </label>
              )
            )}
          </label>
          <label className={style.form__label}>
            Kleuren:
            {["Rood", "Blauw", "Geel", "Groen", "Zwart", "Wit"].map((color) => (
              <label key={color}>
                <input
                  type="checkbox"
                  name="colours"
                  value={color}
                  checked={formData.colours.includes(color)}
                  onChange={handleChange}
                />
                {color}
              </label>
            ))}
          </label>
          <label className={style.form__label}>
            Geslacht:
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              required
            >
              <option value="Mannen">Mannen</option>
              <option value="Vrouwen">Vrouwen</option>
              <option value="Unisex">Unisex</option>
            </select>
          </label>
          <label className={style.form__label}>
            Voetvorm:
            <select
              name="footschape"
              value={formData.footschape}
              onChange={handleChange}
              required
            >
              <option value="Egyptisch">Egyptisch</option>
              <option value="Grieks">Grieks</option>
              <option value="Romeins">Romeins</option>
            </select>
          </label>
          <label className={style.form__label}>
            Zool:
            <select
              name="sole"
              value={formData.sole}
              onChange={handleChange}
              required
            >
              <option value="Vibram XS">Vibram XS</option>
              <option value="Vibram CS">Vibram CS</option>
              <option value="Trax">Trax</option>
              <option value="Andere">Andere</option>
            </select>
          </label>
          <label className={style.form__label}>
            Categorie:
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Klittenband">Klittenband</option>
              <option value="Veters">Veters</option>
              <option value="Slip-on">Slip-on</option>
            </select>
          </label>
          <div
            onClick={onClose}
            className={`${style.modal__button} ${style.no}`}
          >
            Annuleren
          </div>
          <button
            type="submit"
            className={`${style.modal__button} ${style.yes}`}
          >
            Opslaan
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
