import React, { useState } from "react";
import { registerUser } from "../../axios/endpoints";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [data, setData] = useState({
    fname: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("full_name", data.fname);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      const res = await registerUser(formData);
      // console.log(res);
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/login", { replace: true });
      } else {
        toast.error(res.data.message);
      }

      setData({
        fname: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (e) {
      // console.log(e);
      if (e.response) {
        toast.error(e.response.data.message);
      }
    }
  };

  return (
    <div className="base">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form className="base_container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fname" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fname"
            name="fname"
            placeholder="John Doe"
            required
            onChange={handleChange}
            value={data.fname}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
            onChange={handleChange}
            value={data.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            required
            onChange={handleChange}
            value={data.phone}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            required
            onChange={handleChange}
            value={data.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
