import "./App.css";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import Register from "./components/Register";
import axios from "axios";
import { Cart } from "./components/Cart";
<<<<<<< HEAD
import ResponsiveAppBar from "./components/prueba";
=======
import { Categories } from "./components/Categories";
import { Checkout } from "./components/Checkout";
import Sidebar from "./components/Sidebar"


>>>>>>> develop

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem("user");
    if (storedAuth) {
      setUser(JSON.parse(storedAuth));
    }
  }, []);

  const updateUser = (userAuth) => {
    setUser(userAuth);
  };


  const handleLogout = () => {
    axios
      .post("http://localhost:3001/user/logout", null, {
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

  return (
    <div>
<<<<<<< HEAD
      <ResponsiveAppBar user={user} handleLogout={handleLogout} />
      <Routes>
=======
      <Navbar user={user} handleLogout={handleLogout} />

      <Routes>        
        <Route path="/user/register" element={<Register />} />
>>>>>>> develop
        <Route path="/" element={<Grid />} />
        <Route path="/user/login" element={<Login updateUser={updateUser} />} />
        <Route path="/order" element={<Cart/>} />
        <Route path="/admin" element={<Sidebar/>} />
        <Route path="/admin" element={<Categories />} />
        <Route path="/checkout" element={<Checkout/>} />
        
      </Routes>
    </div>
  );
}

export default App;
