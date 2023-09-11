import "./App.css";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import Register from "./components/Register";


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
  return (
    <div>
      <Navbar />
      <Grid />
      <Routes>
        <Route path="/user/login" element={<Login updateUser={updateUser} />} />
        <Route path="/user/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
