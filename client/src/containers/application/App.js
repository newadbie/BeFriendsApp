import React from 'react'
import { Container } from "react-bootstrap";
import Navigation from "../navigation/Navigation";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <React.Fragment>
      <Navigation />
      <Container fluid></Container>
    </React.Fragment>
  );
};

export default App;
