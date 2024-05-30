import React, { useEffect, useState } from "react";
import style from "./Dashboard.module.css";
import { useProducts } from "../../contexts/ProductContext";
import Loader from "../../components/Loader/Loader";
import ProductCard from "../../components/ProductCard/ProductCard";
import MessageItem from "../../components/MessageItem/MessageItem";
import UserItem from "../../components/UserItem/UserItem";
import CreateProductModal from "../../components/Modals/CreateProductModal/CreateProductModal";
import { useAuthContext } from "../../contexts/AuthContainer";
import AddUserModal from "../../components/Modals/AddUserModal/AddUserModal";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../consts/ROUTES";

const Dashboard = () => {
  const { productData, isLoading, errors } = useProducts();
  const { user } = useAuthContext();
  const [userData, setUserData] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const handleOpenProductModal = () => setProductModalOpen(true);
  const handleCloseProductModal = () => setProductModalOpen(false);

  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const handleOpenUserModal = () => setUserModalOpen(true);
  const handleCloseUserModal = () => setUserModalOpen(false);


  if (user.role === "user") {
    navigate(ROUTES.home);
  }
  const fetchMessages = () => {
    setMessages([]);
    fetch(`${import.meta.env.VITE_API_URL}/messages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.message) {
          setMessages([...data]);
        }
      })
      .catch((error) => console.error("Error fetching messages:", error));
  };

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
  }, [users]);

  // TODO - vragen voor loop te fixen
  useEffect(() => {
    fetchMessages();
  }, []);


  let userProducts = undefined;
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/current`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);
  if (userData && productData) {
    const userId = userData._id;
    userProducts = productData.filter((product) => product.userId === userId);
  }

  if (isLoading) {
    return <Loader />;
  }
  if (errors) {
    return <p>Er is iets misgegaan: {errors.message}</p>;
  }
  if (!productData.length) {
    return <p>Er zijn geen producten gevonden.</p>;
  } else
    return (
      <div>
        <CreateProductModal
          isOpen={isProductModalOpen}
          onClose={handleCloseProductModal}
        />
        <AddUserModal isOpen={isUserModalOpen} onClose={handleCloseUserModal} />
        <section className={`${style.products} ${style.section}`}>
          <div className={style.title__flex}>
            <h1 className={style.section__title}>Jouw producten</h1>
            <svg
              className={style.addIcon}
              onClick={handleOpenProductModal}
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              viewBox="0 0 27 27"
            >
              <path
                id="Icon_akar-plus"
                data-name="Icon akar-plus"
                d="M18,30V18m0,0V6m0,12H30M18,18H6"
                transform="translate(-4.5 -4.5)"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeWidth="3"
              />
            </svg>
          </div>
          <div className={style.grid}>
            {userProducts && userData ? (
              userProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  settings={{ deleteButton: true, editButton: true }}
                />
              ))
            ) : (
              <p>Je hebt nog geen producten toegevoegd.</p>
            )}
          </div>
        </section>
        <section className={`${style.messages} ${style.section}`}>
          <div className={style.title__flex}>
            <h1 className={style.section__title}>Contactberichten</h1>
          </div>
          <div className={style.flex}>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <MessageItem
                  key={index}
                  message={message}
                  fetchMessages={fetchMessages}
                />
              ))
            ) : (
              <p>U hebt op dit moment geen berichten.</p>
            )}
          </div>
        </section>
        {user && user.role === "admin" && (
          <section className={`${style.users} ${style.section}`}>
            <div className={style.title__flex}>
              <h1 className={style.section__title}>Gebruikers</h1>
              <svg
                className={style.addIcon}
                onClick={handleOpenUserModal}
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 27 27"
              >
                <path
                  id="Icon_akar-plus"
                  data-name="Icon akar-plus"
                  d="M18,30V18m0,0V6m0,12H30M18,18H6"
                  transform="translate(-4.5 -4.5)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
              </svg>
            </div>

            <div className={style.flex}>
              {users
                .filter(
                  (user) => user.role === "admin" || user.role === "seller"
                )
                .map((user, index) => (
                  <UserItem key={index} user={user} />
                ))}
            </div>
          </section>
        )}
      </div>
    );
};

export default Dashboard;
