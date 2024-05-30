import React, { useState } from "react";
import style from "./Register.module.css";
import ROUTES from "../../consts/ROUTES";
import { Link, useNavigate } from "react-router-dom";
import useMutation from "../../hooks/useMutation";

const Register = ({ onLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState();

  const [errors, setErrors] = useState({});

  const registerMutation = useMutation();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "Voornaam is verplicht";
    if (!lastName.trim()) newErrors.lastName = "Familienaam is verplicht";
    if (!street.trim())
      newErrors.street = "Straat en huisnummer zijn verplicht";
    if (!city.trim()) newErrors.city = "Stad is verplicht";
    if (!zip.trim()) newErrors.zip = "Postcode is verplicht";
    if (!state.trim()) newErrors.state = "Provincie is verplicht";
    if (!email.trim()) newErrors.email = "Email is verplicht";
    else if (!validateEmail(email))
      newErrors.email = "Voer een geldig e-mailadres in";
    if (!password.trim()) newErrors.password = "Wachtwoord is verplicht";
    if (!password2.trim())
      newErrors.password2 = "Bevestig wachtwoord is verplicht";
    if (password !== password2)
      newErrors.password2 = "Wachtwoorden komen niet overeen";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    registerMutation.mutate(`${import.meta.env.VITE_API_URL}/register`, {
      method: "POST",
      data: {
        firstName,
        lastName,
        address: {
          street,
          city,
          state,
          zip,
        },
        email,
        password,
      },
      onSuccess: (data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          onLogin({ email, password });
          navigate(ROUTES.home);
        }
      },
    });
  };

  const generatePassword = () => {
    const randomString = Math.random()
      .toString(36)
      .substring(2, Math.floor(Math.random() * 9) + 8);
    setGeneratedPassword(randomString);
    setPassword(randomString);
    setPassword2(randomString);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleRegister}>
        <label className={style.form__label} htmlFor="firstName">
          Voornaam:
        </label>
        <input
          className={`${style.form__input} ${
            errors.firstName ? style.form__input_error : ""
          }`}
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && (
          <div className={style.error}>{errors.firstName}</div>
        )}

        <label className={style.form__label} htmlFor="lastName">
          Familienaam:
        </label>
        <input
          className={`${style.form__input} ${
            errors.lastName ? style.form__input_error : ""
          }`}
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          required
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && (
          <div className={style.error}>{errors.lastName}</div>
        )}

        <label className={style.form__label} htmlFor="street">
          Straat + huisnummer:
        </label>
        <input
          className={`${style.form__input} ${
            errors.street ? style.form__input_error : ""
          }`}
          type="text"
          id="street"
          name="street"
          value={street}
          required
          onChange={(e) => setStreet(e.target.value)}
        />
        {errors.street && <div className={style.error}>{errors.street}</div>}

        <label className={style.form__label} htmlFor="city">
          Stad:
        </label>
        <input
          className={`${style.form__input} ${
            errors.city ? style.form__input_error : ""
          }`}
          type="text"
          id="city"
          name="city"
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
        />
        {errors.city && <div className={style.error}>{errors.city}</div>}

        <label className={style.form__label} htmlFor="zip">
          Postcode:
        </label>
        <input
          className={`${style.form__input} ${
            errors.zip ? style.form__input_error : ""
          }`}
          type="text"
          id="zip"
          name="zip"
          value={zip}
          required
          onChange={(e) => setZip(e.target.value)}
        />
        {errors.zip && <div className={style.error}>{errors.zip}</div>}

        <label className={style.form__label} htmlFor="state">
          Provincie:
        </label>
        <input
          className={`${style.form__input} ${
            errors.state ? style.form__input_error : ""
          }`}
          type="text"
          id="state"
          name="state"
          value={state}
          required
          onChange={(e) => setState(e.target.value)}
        />
        {errors.state && <div className={style.error}>{errors.state}</div>}

        <label className={style.form__label} htmlFor="email">
          Email:
        </label>
        <input
          className={`${style.form__input} ${
            errors.email ? style.form__input_error : ""
          }`}
          type="email"
          id="email"
          name="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />
        {errors.email && <div className={style.error}>{errors.email}</div>}

        <label className={style.form__label} htmlFor="password">
          Wachtwoord:
        </label>
        <input
          className={`${style.form__input} ${
            errors.password ? style.form__input_error : ""
          }`}
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={generatedPassword || password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <div className={style.error}>{errors.password}</div>
        )}

        <label className={style.form__label} htmlFor="password2">
          Herhaal wachtwoord:
        </label>
        <input
          className={`${style.form__input} ${
            errors.password2 ? style.form__input_error : ""
          }`}
          type={showPassword ? "text" : "password"}
          id="password2"
          name="password2"
          value={generatedPassword || password2}
          required
          onChange={(e) => setPassword2(e.target.value)}
        />
        {errors.password2 && (
          <div className={style.error}>{errors.password2}</div>
        )}

        <label className={style.form__label} htmlFor="showPassword">
          <input
            className={style.form__input}
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={togglePasswordVisibility}
          />
          Show Password
        </label>

        <button className={style.form__button} type="submit">
          Registreer
        </button>

        <div className={style.secondary__buttons}>
          <Link to={ROUTES.login}>Log in</Link>
          <p onClick={generatePassword} className={style.password__button}>
            Genereer wachtwoord
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
