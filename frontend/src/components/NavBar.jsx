import { Link } from "react-router-dom";
import { gimmeSpace } from "../utilities/utilityFunctions";
import Navbar from 'react-bootstrap/Navbar';

function NavBar({ loggedInAs }) {

  return (
    <Navbar>
      <Navbar.Brand href="#home">
        <img
        src={require('./imagefiles/one-piece-logo.png')}
        width="200"
        className="d-inline-block align-top"
        alt="One Piece logo"
        />
      </Navbar.Brand>
      <Link to="/">
        <h1>SHOPPING APP</h1>
      </Link>
      {loggedInAs.first_name && (
        <>
          <p>Welcome
            {" "}
            <Link to={`customers/${loggedInAs.id}`}>
              {loggedInAs.first_name}
            </Link>
            !
          </p>
          <Link to={`customers/${loggedInAs.id}/cart`}>
            Cart
          </Link>
          {gimmeSpace(5)}
          <Link to={`retailer/products/new`}>
            Enter New Product
          </Link>
        </>
      )}
    </Navbar>
  )
}

export default NavBar;