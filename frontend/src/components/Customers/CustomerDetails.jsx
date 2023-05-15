import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { gimmeSpace } from "../../utilities/utilityFunctions";
const API = process.env.REACT_APP_API_URL;

function CustomerDetails({ setLoggedInAs }) {
  const [theCustomer, setTheCustomer] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    first_name,
    last_name,
    email,
    phone,
    address_street,
    address_street2,
    address_city,
    address_state,
    address_postal_code,
    payment_info
  } = theCustomer;
  const fullAddress = `${address_street}${address_street2 ? " " + address_street2 : ""}, ${address_city}, ${address_state} ${address_postal_code}`;

  useEffect(() => {
    async function getCustomersById() {
      await axios
        .get(`${API}/customers/${id}`)
        .then(response => setTheCustomer(response.data))
        .catch(error => {
          setTheCustomer({
            id: "Guest",
            first_name: "Guest",
            last_name: "User",
            email: "guestuser@nomail.com",
            phone: "(000) 000-0000",
            address_street: "123 Elf Road",
            address_street2: null,
            address_city: "North Pole",
            address_state: "Sea Ice",
            address_postal_code: "88888",
            payment_info: "Payment: Coal"
          })
          console.error("Error: GET", error)
        })
    };

    getCustomersById();
  }, [id]);

  async function handleDelete() {
    if (Number(id) === 1) {
      alert(`Action cancelled.  Guest user may not be deleted or modified.`)
    } else {
      if (window.confirm("Are you sure you want to delete this Account?")) {
        await axios
          .delete(`${API}/customers/${id}`)
          .then(() => navigate('/customers'))
          .catch(error => console.error("Error: DELETE", error));
      }
    }
  };

  return (
    <div className="Customer-Details centerme">
      <div>
        <h2>{first_name} {last_name}</h2>
        <p>{phone}</p>
        <p>{email}</p>
        <p>{fullAddress}</p>
        <p>{payment_info}</p>
      </div>
      <div>
        <button onClick={() => navigate(-1)} className="slidyfunfun">Back {gimmeSpace(1)}</button>
        {Number(id) !== 1 ? <Link to={`/customers/${id}/edit`}>
          <button className="slidyfunfun">Edit {gimmeSpace(1)}</button>
        </Link> : <div></div>}
        <button onClick={() => handleDelete()} className="slidyfunfun">Delete {gimmeSpace(1)}</button>
        <br />
        <Link to={`/customers/${id}/history`}>
          <button className="slidyfunfun">Purchase History {gimmeSpace(1)}</button>
        </Link>
      </div>
    </div>
  );
}

export default CustomerDetails;