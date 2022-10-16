import Home from "./Views/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import About from "./Views/About";
import Profile from "./Views/Profile";
import Login from "./Views/Login";
import Register from "./Views/Register";
import Trees from "./Views/Trees";
import Adopt from "./Components/Adopt.js";
import NaN from "./Views/NaN";
import getToken from "./utils/getToken.js";
import { useState } from "react";
import { AuthContextProvider } from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute.js";

function App() {
  const [user, setUser] = useState(null);

  const isUserLoggedIn = () => {
    const token = getToken();
    if (token) {
      setUser(true);
      console.log("user is logged in");
    }
    if (!token) {
      console.log("user is NOT logged in");
      setUser(false);
    }
  };

  return (
    <div className="App">
      <AuthContextProvider>
        {" "}
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/trees" element={<Trees />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/adopt" element={<Adopt />} />
            <Route path="*" element={<NaN />} />
          </Routes>
          <Footer />
        </BrowserRouter>{" "}
      </AuthContextProvider>
    </div>
  );
}

export default App;
