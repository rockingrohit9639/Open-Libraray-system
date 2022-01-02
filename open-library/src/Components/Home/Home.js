import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_AUTH } from "../../redux/actions";

function Home() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.isAuth);

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
    <div>
      {
          isAuth ? <h1>Welcome { localStorage.getItem("name") }</h1> : <h1>You are not logged in </h1>
      }
    </div>
  );
}

export default Home;
