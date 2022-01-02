import React from "react";

function Signup() {
  return (
    <div className="base">
      <form className="base_container">
        <div class="mb-3">
          <label for="fname" class="form-label">
            Full Name
          </label>
          <input
            type="text"
            class="form-control"
            id="fname"
            name="fname"
            placeholder="John Doe"
            required
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            class="form-control"
            id="phone"
            name="phone"
            required
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
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

export default Signup;
