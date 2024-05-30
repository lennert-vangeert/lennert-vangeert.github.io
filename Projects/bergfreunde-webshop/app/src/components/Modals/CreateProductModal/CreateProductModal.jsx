import React, { useState } from "react";
import style from "./CreateProductModal.module.css";
import useMutation from "../../../hooks/useMutation";

const CreateProductModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  const createMutation = useMutation();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
    rating: 1,
    images: ["", "", ""],
    sizes: [],
    colours: [],
    sex: "",
    footschape: "",
    sole: "",
    category: "",
  });
  const [errors, setErrors] = useState({});

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
    if (!formData.brand) newErrors.brand = "Merk is verplicht";
    if (!formData.images.every((img) => img))
      newErrors.images = "Alle afbeeldingen zijn verplicht";
    if (!formData.sizes.length)
      newErrors.sizes = "Minstens één maat is verplicht";
    if (!formData.colours.length)
      newErrors.colours = "Minstens één kleur is verplicht";
    if (!formData.sex) newErrors.sex = "Geslacht is verplicht";
    if (!formData.footschape) newErrors.footschape = "Voetvorm is verplicht";
    if (!formData.sole) newErrors.sole = "Zool is verplicht";
    if (!formData.category) newErrors.category = "Categorie is verplicht";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!validateForm()) return;
    createMutation.mutate(`${import.meta.env.VITE_API_URL}/products`, {
      method: "POST",
      data: formData,
      onSuccess: () => {
        console.log("Product created");
        onClose(); // Close the modal on successful creation
        window.location.reload(); // Reload the page to show the new product
      },
    });
  };

  return (
    <div className={style.modalOverlay}>
      <div className={style.modal}>
        <h2 className={style.modal__title}>Product aanmaken</h2>
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
              <option value="" disabled>
                --Kies een optie--
              </option>
              <option value="La Sportiva">La Sportiva</option>
              <option value="Scarpa">Scarpa</option>
              <option value="Red Chili">Red Chili</option>
              <option value="unParallel">unParallel</option>
              <option value="Boreal">Boreal</option>
            </select>
            {errors.brand && <div className={style.error}>{errors.brand}</div>}
          </label>
          <label className={style.form__label}>
            Afbeeldingen:
            {formData.images.map((image, index) => (
              <div key={index}>
                <input
                  type="text"
                  name={`images_${index}`}
                  value={image}
                  onChange={handleChange}
                  required
                />
                {errors.images && !image && (
                  <div className={style.error}>{errors.images}</div>
                )}
              </div>
            ))}
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
            {errors.sizes && <div className={style.error}>{errors.sizes}</div>}
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
            {errors.colours && (
              <div className={style.error}>{errors.colours}</div>
            )}
          </label>
          <label className={style.form__label}>
            Geslacht:
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                --Kies een optie--
              </option>
              <option value="Mannen">Mannen</option>
              <option value="Vrouwen">Vrouwen</option>
              <option value="Unisex">Unisex</option>
            </select>
            {errors.sex && <div className={style.error}>{errors.sex}</div>}
          </label>
          <label className={style.form__label}>
            Voetvorm:
            <select
              name="footschape"
              value={formData.footschape}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                --Kies een optie--
              </option>
              <option value="Egyptisch">Egyptisch</option>
              <option value="Grieks">Grieks</option>
              <option value="Romeins">Romeins</option>
            </select>
            {errors.footschape && (
              <div className={style.error}>{errors.footschape}</div>
            )}
          </label>
          <label className={style.form__label}>
            Zool:
            <select
              name="sole"
              value={formData.sole}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                --Kies een optie--
              </option>
              <option value="Vibram XS">Vibram XS</option>
              <option value="Vibram CS">Vibram CS</option>
              <option value="Trax">Trax</option>
              <option value="Andere">Andere</option>
            </select>
            {errors.sole && <div className={style.error}>{errors.sole}</div>}
          </label>
          <label className={style.form__label}>
            Categorie:
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                --Kies een optie--
              </option>
              <option value="Klittenband">Klittenband</option>
              <option value="Veters">Veters</option>
              <option value="Slip-on">Slip-on</option>
            </select>
            {errors.category && (
              <div className={style.error}>{errors.category}</div>
            )}
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

export default CreateProductModal;
