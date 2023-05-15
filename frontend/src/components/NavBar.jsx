import { Link } from "react-router-dom";
import { gimmeSpace } from "../utilities/utilityFunctions";

function NavBar({ loggedInAs }) {

  return (
    <nav className="slimshady">
      <img className="navlogo"
        src={require('./imagefiles/one-piece-logo.png')}
        alt="One Piece logo"
      />
      <h1 className="navtext">
        <Link to="/">
          SHOPPING APP {gimmeSpace(1)}
        </Link>
      </h1>
      <h1 className="navtext">Welcome {gimmeSpace(1)}
        <Link to={`customers/${loggedInAs.id}`}>
          {loggedInAs.first_name}! {gimmeSpace(1)}
        </Link>
      </h1>
      <h1 className="navtext">
        <Link to={`customers/${loggedInAs.id}/cart`}>
          Cart {gimmeSpace(1)}
        </Link>
      </h1>
      <h1 className="navtext">
        <Link to={`retailer/products/new`}>
          Enter New Product {gimmeSpace(1)}
        </Link>
      </h1>
    </nav>
  )
}

export default NavBar;