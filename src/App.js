import "./App.css";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <Navbar />
      <Grid />
      <Register />
      {/* <Routes>
      Habilitar cuando se vayan a incorporar las rutas
      </Routes> */}
    </div>
  );
}

export default App;
