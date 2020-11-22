import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";

const App = () => {
  const [getItemsState, setItemsState] = useState({
    items: [{ title: "Homepage" }, { title: "Login" }]
  });

  return (
    <React.Fragment>
      <Navbar items={getItemsState.items} />
    </React.Fragment>
  );
};

export default App;
