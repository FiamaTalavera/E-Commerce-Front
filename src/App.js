import "./App.css";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid"


function App() {
  return (
    <div>
      <Navbar />
      <Grid />
      {/* <Routes>
      Habilitar cuando se vayan a incorporar las rutas
      </Routes> */}
    </div>
  );
}

export default App;
