import { css } from "lit";

export const defaultStyles = css`
  //my css
  @import url("https://fonts.googleapis.com/css?family=Open+Sans:400,700");

  :root {
    --main-font: "Open Sans", sans-serif;

    --main-blue: #05f5f5;
  }
  * {
    font-family: var(--main-font);
  }

  //reset.css
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }
`;

export const formStyles = css`
  .main__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  .main__form-label {
    width: 100%;
  }
  .label__text {
    margin: 0.5rem 0;
  }
  .main__form-input {
    padding: 0.5rem 0.5rem;
    border: 1px solid #ccc;
    outline: none;
    width: calc(100% - 1rem);
  }
  .main__form-button {
    padding: 0.5rem 0.5rem;
    border: 1px solid #ccc;
    outline: none;
    background-color: #00ffff;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    text-align: center;
    margin-top: 1rem;
    width: 100%;
  }
  .main__form-button:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease-in-out;
  }
`;

export const tableStyles = css`
  .table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 1rem;
    max-width: 70rem;
  }

  .table__row {
    border: 1px solid #ccc;
    height: 3rem;
  }
  .table__row:nth-child(even) {
    background-color: var(--light-blue); /* or any other color you prefer */
  }
  
  .table__head {
    padding: 0.5rem;
    text-align: left;
    font-weight: bold;
  }
  .table__row-head {
    border: 1px solid #ccc;
    background-color: var(--main-blue);
    width: 100%;

  }
  .table__item {
    padding: 0.5rem;
    text-align: left;
  }
  .type__icon {
    height: 3rem;
  }
`;

export const deleteStyles = css`
  .buttons {
    display: flex;
    justify-content: end;
    margin-top: 20px;
    gap: 1rem;
    width: 100%;
  }
  .button__item {
    padding: 0.5rem 0.5rem;
    border: none;
    color: white;
    width: 5rem;
    border-radius: 0;
    text-align: center;
  }
  .button__item:hover {
    cursor: pointer;
  }
  .cancel {
    color: #000000;
    background-color: #fff;
  }
  .cancel:hover {
    text-decoration: underline;
  }
  .delete {
    background-color: #FF0000;
  }
  .delete:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
`;
