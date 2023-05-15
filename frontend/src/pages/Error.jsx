import { Link } from "react-router-dom";
import { gimmeSpace } from "../utilities/utilityFunctions";

function Error() {
  return (
    <div>
      <h1>404 Not Found Error</h1>
      <Link to="/">
        <button className="slidyfunfun">Back to the Home Page {gimmeSpace(1)}</button>
      </Link>
    </div>
  )
}

export default Error;