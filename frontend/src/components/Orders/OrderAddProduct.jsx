import { useState } from "react";
import { gimmeSpace } from "../../utilities/utilityFunctions";


export default function OrderAddProduct({ productInStock, cart, setCart, loggedInAs, productID }) {
  const [formQty, setFormQty] = useState(0);
  const [confirmAddToCart, setConfirmAddToCart] = useState(false);

  const handleTextChange = (event) => {
    const htcValue = event.target.value;
    setFormQty((htcValue !== "") ? Number(htcValue) : 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formQty <= productInStock) {
      setCart({ ...cart, [`customer${loggedInAs.id}`]: { ...cart[`customer${loggedInAs.id}`], [`product${productID}`]: Number(formQty) } });
      setConfirmAddToCart(true);
    } else {
      setCart({ ...cart, [`customer${loggedInAs.id}`]: { ...cart[`customer${loggedInAs.id}`], [`product${productID}`]: Number(productInStock) } });
      setConfirmAddToCart(true);
      alert(`Sorry, only ${productInStock} of ${event.target.quantity} item(s) in stock.  Your order has been updated to the maximum available quantity.`)
    }
    setFormQty(0);
  };

  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="quantity">Quantity:</label>
        <input
          id="quantity"
          value={formQty === 0 ? "" : formQty}
          type="number"
          onChange={handleTextChange}
          placeholder="0"
        />
        <br />
        <button type="submit" className="slidyfunfun">Add To Cart {gimmeSpace(1)}</button>
      </form>
      <div>
        {confirmAddToCart ? "Order added to cart" : ""}
      </div>
    </div>
  );
}
