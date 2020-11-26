export const isLogged = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return (state = true);
    case "LOGOUT":
      return (state = false);
    default:
      return state;
  }
};
