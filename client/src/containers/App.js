import React from "react";
import Navbar from "../components/Navbar";
import Container from "react-bootstrap/Container";
import Register from "./register/Register";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Container className="mt-5" fluid>
        <Register />
      </Container>
    </React.Fragment>
  );
};

export default App;
