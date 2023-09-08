import "./App.css";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid"
import Login from "./components/Login";
import { useEffect, useState } from "react";



function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem("user");
    if (storedAuth) {
      setUser(JSON.parse(storedAuth));
    }
  }, []);

  const updateUser = (userAuth) => {
    setUser(userAuth)
  }
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path="/" element={<Grid />} />
      <Route path="/user/login" element={<Login updateUser={updateUser} />}/>
      </Routes> 
    </div>
  );
}

export default App;
