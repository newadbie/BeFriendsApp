import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Register from './../register/Register';


const App = () => {
  const [getItemsState, setItemsState] = useState({
    items: [{ title: "Homepage" }, { title: "Login" }]
  });

  return (
    <React.Fragment>
      <Navbar items={getItemsState.items} />
      <Register />
    </React.Fragment>
  );
};

export default App;
