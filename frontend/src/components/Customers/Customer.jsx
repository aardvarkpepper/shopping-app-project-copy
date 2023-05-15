import { useNavigate } from "react-router-dom";
import { gimmeSpace } from "../../utilities/utilityFunctions";

function Customer({ customer, setLoggedInAs }) {
  const navigate = useNavigate();

  function handleOnClick() {
    setLoggedInAs(customer);
    navigate("/products");
  }

  return (
    <>
      <li>
        <button onClick={() => handleOnClick()} className="slidyfunfun">{customer.first_name} {gimmeSpace(1)}</button>
      </li>
    </>
  )
}

export default Customer;