import React, { useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import "react-toastify/dist/ReactToastify.css";
import NewBook from "./Components/NewBook/NewBook";
import { useDispatch } from "react-redux";
import { SET_AUTH } from "./redux/actions";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("@tk")) {
      dispatch({
        type: SET_AUTH,
        payload: true,
      });
    } else {
      dispatch({
        type: SET_AUTH,
        payload: false,
      });
    }
  }, [
    localStorage.getItem("@tk"),
    localStorage.getItem("name"),
    localStorage.getItem("email"),
  ]);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup" element={<NewBook />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
