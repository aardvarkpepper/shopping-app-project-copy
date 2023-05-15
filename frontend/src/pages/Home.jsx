import { Link } from "react-router-dom";
import { gimmeSpace } from "../utilities/utilityFunctions";
function Home() {
  return (
    <div className="centerme">
      <h1>Welcome to the Home page!</h1>

      <h3>Are you:</h3>
      <Link to="/customers">
        <button className="slidyfunfun">Customer {gimmeSpace(1)}</button>
      </Link>
      <Link to="/retailer/products">
        <button className="slidyfunfun">Retailer {gimmeSpace(1)}</button>
      </Link>
    </div>
  )
}

export default Home;