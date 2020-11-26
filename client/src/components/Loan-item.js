const loanItem = (props) => {
    console.log(props);
  return (
    <div>
      {props.name}, ows you total: <b>{props.ows}</b>PLN
    </div>
  );
};

export default loanItem;
