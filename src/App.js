import "./App.css";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import Register from "./components/Register";
import axios from "axios";
import { Cart } from "./components/Cart";
import { Categories } from "./components/Categories";
import Sidebar from "./components/Sidebar";
import Checkout from "./components/Checkout/Checkout";
import { Home } from "./components/Home";
import { Searchbar } from "./components/Searchbar";
import History from "./components/History";
import { useNavigate } from "react-router";

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchedProducts, setSearchProducts] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    const storedAuth = localStorage.getItem("user");
    if (storedAuth) {
      setUser(JSON.parse(storedAuth));
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URLBACK}/products`)
      .then((res) => {
        console.log("Los productos --> ", res.data); /* sacar console log? */
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateUser = (userAuth) => {
    setUser(userAuth);
  };

  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_URLBACK}/user/logout`, null, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 204) {
          localStorage.removeItem("user");
          setUser(null);
        } else {
          console.error("Error al cerrar sesión");
        }
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  const onSearch = (searchRes) => {
    setSearchProducts(searchRes);
  };

  return (
    <div>
      <Navbar
        user={user}
        handleLogout={handleLogout}
        clearSearch={() => onSearch([])}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              onSearch={onSearch}
              searchedProducts={searchedProducts}
              products={products}
            />
          }
        />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login updateUser={updateUser} />} />
        <Route path="/order" element={<Cart />} />

        {user && user.is_admin ? (
          <>
            <Route path="/admin" element={<Sidebar />} />
            <Route path="/admin" element={<Categories />} />
          </>
        ): <Route path="/admin" element={<div> 
        Acceso Denegado
        <button onClick={() => navigate("/")}> Volver al Inicio </button>
        </div>} />}

        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/search"
          element={
            <Searchbar
              onSearch={onSearch}
              searchedProducts={searchedProducts}
            />
          }
        />
        <Route path="/user/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
