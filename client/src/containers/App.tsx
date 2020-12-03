import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";

import "./App.scss";
import Routes from "../components/Routes";

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post("http://localhost:8080/checkLogin", {}, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        const isLogged: boolean = res.data.isLogged;
        if (isLogged) {
          dispatch(login());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Po przyjacielsku!</title>
      </Helmet>
      <Routes isLoading={loading}/>
    </>
  );
};
