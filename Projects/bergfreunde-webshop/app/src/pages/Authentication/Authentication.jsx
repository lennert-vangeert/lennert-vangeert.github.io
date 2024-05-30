import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ROUTES from "../../consts/ROUTES";
import Home from "../Home/Home";
import ProductList from "../ProductList/ProductList";
import ProductDetail from "../ProductDetail/ProductDetail";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Account from "../Account/Account";
import Dashboard from "../Dashboard/Dashboard";
import Basket from "../Basket/Basket";
import NotFound from "../../components/NotFound/NotFound";
import { useAuthContext } from "../../contexts/AuthContainer";

const Authentication = () => {
  const { user, login } = useAuthContext();
  return (
    <Routes>
      <Route path={ROUTES.home} element={<Home />} />

      <Route path={ROUTES.productList} element={<ProductList />} />
      <Route path={ROUTES.productDetail.path} element={<ProductDetail />} />

      <Route path={ROUTES.login} element={<Login onLogin={login} />} />
      <Route
        path={ROUTES.register}
        element={<Register onLogin={login} />}
      />

      {user ? (
        <Route path={ROUTES.account} element={<Account />} />
      ) : (
        <Route path={ROUTES.account} element={<Navigate to={ROUTES.login} />} />
      )}
      {user ? (
        <Route path={ROUTES.basket} element={<Basket />} />
      ) : (
        <Route path={ROUTES.basket} element={<Navigate to={ROUTES.login} />} />
      )}
      {user ? (
        <Route path={ROUTES.dashboard} element={<Dashboard />} />
      ) : (
        <Route
          path={ROUTES.dashboard}
          element={<Navigate to={ROUTES.login} />}
        />
      )}
      <Route path={ROUTES.notFound} element={<NotFound />} />
    </Routes>
  );
};

export default Authentication;
