import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

function NewBook() {
  const [data, setData] = useState({
    uname: localStorage.getItem("name"),
    bname: "",
    bclass: "",
    bimage: "",
    bauthor: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
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
      <h1 className="mb-3">Add new book</h1>
      <form className="base_container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="bname" className="form-label">
            Book Name
          </label>
          <input
            type="text"
            className="form-control"
            id="bname"
            name="bname"
            required
            value={data.bname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bclass" className="form-label">
            Class
          </label>
          <input
            type="text"
            className="form-control"
            id="bclass"
            name="bclass"
            value={data.bclass}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bauthor" className="form-label">
            Author's Name
          </label>
          <input
            type="text"
            className="form-control"
            id="bauthor"
            name="bauthor"
            required
            value={data.bauthor}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bimage" className="form-label">
            Book's Image
          </label>
          <input
            type="file"
            className="form-control"
            id="bimage"
            name="bimage"
            accept="image/*"
            value={data.bimage}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewBook;
