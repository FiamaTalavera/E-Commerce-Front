import "./App.css";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid"
import Login from "./components/Login";


function App() {
  return (
    <div>
      <Navbar />
      <Grid />
      <Routes>
      <Route path="/user/login" element={<Login />}/>
      </Routes> 
    </div>
  );
}

export default App;
