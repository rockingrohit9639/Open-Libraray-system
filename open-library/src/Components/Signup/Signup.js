import React, { useState } from "react";
import { registerUser } from "../../axios/endpoints";
import { ToastContainer, toast } from "react-toastify";

function Signup() {
  const [data, setData] = useState({
    fname: "",
    email: "",
    phone: "",
    password: "",
  });

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
      if (res.status === 200) {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      setData({
        fname: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="base">
      <ToastContainer />
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
