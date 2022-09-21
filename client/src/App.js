import Home from "./Views/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import About from "./Views/About";
import Profile from "./Views/Profile";
import Login from "./Views/Login";
import Register from "./Views/Register";
import Trees from "./Views/Trees";
import NaN from "./Views/NaN";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/trees" element={<Trees />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NaN />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
