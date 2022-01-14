import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function Home() {
  const isAuth = useSelector(state => state.isAuth);

  return (
    <div>
      {
          isAuth ? <h1>Welcome { localStorage.getItem("name") }</h1> : <h1>You are not logged in </h1>
      }
    </div>
  );
}

export default Home;
