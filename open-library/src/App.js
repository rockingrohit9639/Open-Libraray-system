import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>

        <Route path="/" element={<Home />}  />
        <Route path="/login" element={<Login />}  />
        <Route path="/signup" element={<Signup />}  />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
