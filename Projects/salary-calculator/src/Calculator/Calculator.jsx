import React, { useState, useEffect } from "react";
import style from "./Calculator.module.css";

function Exercise() {
  const [form, setForm] = useState({
    bruto: 0,
    traffic: 0,
    meal: 0,
    bonus: 0,
  });

  const [total, setTotal] = useState(0);
  const [hourTime, setHourTime] = useState(0);

  const updateHourTime = () => {
    // how much time has passed since the start of the hour
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const hourTime = minutes / 60 + seconds / 3600;
    setHourTime(hourTime);
  };

  useEffect(() => {
    // update every second
    const interval = setInterval(updateHourTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const workDays = 5;
  const workHours = workDays * 7.75;

  const currencyFormatter = new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
  });

  useEffect(() => {
    const storedForm = JSON.parse(localStorage.getItem("formValues"));
    if (storedForm) {
      setForm(storedForm);
      calculateSalary(storedForm);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("formValues", JSON.stringify(form));
    calculateSalary(form);
  };

  const calculateSalary = (form) => {
    if (
      form.bruto === 0 ||
      form.traffic === 0 ||
      form.meal === 0 ||
      form.bonus === 0
    ) {
      return;
    }
    const traffic = form.traffic * workDays;
    const meal = (form.meal - 1.09) * workDays;
    const bonus = form.bonus * workHours;
    const salary = form.bruto * workHours;
    const totalSalary = salary + traffic + meal + bonus;
    setTotal(totalSalary);
  };

  return (
    <div className={style.main}>
      <img src="https://www.food.be/sites/food/files/companies/0012000000RYY8KAAX/01257000000VEN1AAO/logoinex.png" alt="" />
      <h1>Loon rekenmachine (jobstudenten)</h1>
      <form className={style.form} onSubmit={handleSubmit}>
        <label htmlFor="bruto">
          Bruto loon (per uur)
          <input
            required
            type="number"
            name="bruto"
            step="0.01"
            value={form.bruto}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="traffic">
          Woon-werkverkeer (per dag)
          <input
            required
            type="number"
            name="traffic"
            step="0.01"
            value={form.traffic}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="meal">
          Maaltijdcheques (per dag)
          <input
            required
            type="number"
            name="meal"
            step="0.01"
            value={form.meal}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="bonus">
          Toeslagen (per uur)
          <input
            required
            type="number"
            name="bonus"
            step="0.01"
            value={form.bonus}
            onChange={handleChange}
          />
        </label>
        <button className={style.button} type="submit">
          Bereken
        </button>
      </form>
      <div className={style.results}>
        <h1>Resultaten</h1>
        <h2>Wekelijkse loon</h2>
        <p className={style.result}>{currencyFormatter.format(total)}</p>
        <h2>Maandelijkse loon</h2>
        <p className={style.result}>{currencyFormatter.format(total * 4)}</p>
        <p>
          Je hebt dit uur al{" "}
          <span className={style.bold}>
            {currencyFormatter.format((hourTime * total) / workHours)}
          </span>{" "}
          verdient
        </p>
      </div>
    </div>
  );
}

export default Exercise;
