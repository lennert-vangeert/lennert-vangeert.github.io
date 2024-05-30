import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import ROUTES from "../../consts/ROUTES";
import useMutation from "../../hooks/useMutation";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();

  const loginMutation = useMutation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      data: { email, password },
      onSuccess: (data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          onLogin({ email, password });
          navigate(ROUTES.home);
          setError();
        }
      },
      onError: () => {
        setError("Email of wachtwoord is onjuist");
      },
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={style.container}>
      <form className={style.form}>
        <h2>Login</h2>
        {error ? <div className={style.error}>{error}</div> : null}
        <label className={style.form__label} htmlFor="email">
          Email:
        </label>
        <input
          className={style.form__input}
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={style.form__label} htmlFor="password">
          Password:
        </label>
        <input
          className={style.form__input}
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

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

        <button className={style.form__button} onClick={handleLogin}>
          Login
        </button>
        <Link to="/register">Registreer</Link>
      </form>
    </div>
  );
};

export default Login;
