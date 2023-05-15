import axios from "axios";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

const API = process.env.REACT_APP_API_URL;
const {
  deepCopyObject
} = require("../../utilities/utilityFunctions.js");

export default function CustomerCart({ loggedInAs, cart, setCart, customerCart = {} }) {

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [itemIDArray, setItemIDArray] = useState([]);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  /*
  First useEffect causes second useEffect to trigger, but not when there is data in customerCart.  Why?  Possibly response.data.filter(all false) or
  [].includes(product.id)  useRef alternate solution.
  */
  useEffect(() => {
    if (Object.keys(customerCart).length !== 0) {
          setItemIDArray(Object.keys(customerCart).map(lineItemOnOrder => Number(lineItemOnOrder.replace("product", ""))))
    }
  }, [customerCart]);

  useEffect(() => {
    axios.get(`${API}/products`)
      .then((response) => {
        const filteredList = response.data.filter(product => {
          return (itemIDArray.includes(product.id));
        })
        setFilteredProducts(filteredList);
      })
      .catch((e) => console.warn("catch", e));
  }, [itemIDArray]);

  const listCartItems = () => {
    if (Object.keys(customerCart).length === 0) {
      return (
        <div>No items in cart</div>
      )
    } else if (checkoutComplete) {
      console.log("listCartItems checkout complete", cart)
      return (
        <div>Checkout complete.</div>
      )
    } else {
      return (
        <Table striped border-dark responsive className="text-overlay">
          <tbody>
            {filteredProducts.map((product) => {
              console.log("listCartItems filteredProducts");
              return (
                <tr key={`listCartItems${product.id}`}>
                  <td className="px-2 py-2">
                    <img src={require(`../Products${(product.image_url).replace(".", "")}`)} alt={`${product.description}`} style={{ "width": "50px" }}></img>
                  </td>
                  <td className="px-2 py-2">
                    {product.name}
                  </td>
                  <td className="px-2 py-2">
                    Quantity Ordered: {customerCart[`product${product.id}`]}
                  </td>
                </tr>
              )
            })
            }
          </tbody>
        </Table>
      )
    }
  }
  //listCartItems

  const handleCheckout = async () => {
    try {
      const promises = filteredProducts.map(async (product) => {
        console.log(`handleCheckout put, item ${product.id}`);
        await axios.put(`${API}/products/${product.id}`,
          {
            ...product,
            quantity_in_stock: Number(product.quantity_in_stock - customerCart[`product${product.id}`]),
          })
        // put

        const date = new Date();

        await axios.post(`${API}/orders`,
          {
            product_id: Number(product.id),
            customer_id: Number(loggedInAs.id),
            product_qty: Number(customerCart[`product${product.id}`]),
            date:
            date.toLocaleString("default", { year: "numeric" })
            + "-"
            + date.toLocaleString("default", { month: "2-digit" })
            + "-"
            + date.toLocaleString("default", { day: "2-digit" }),
          });
        // axios post

        setCart((previous) => {
          const tempCart = deepCopyObject(previous);
          delete tempCart[`customer${loggedInAs.id}`][`product${product.id}`];
          return tempCart;
        });
      });
      // promises

      // wait until all promises performed with Promise.all
      await Promise.all(promises);
      setCheckoutComplete(true);
      
      /*
      Alternate implementation setCart
      const tempCart = deepCopyObject(cart);
      for (const productToDelete of itemIDArray) {
          delete tempCart[`customer${loggedInAs.id}`][`product${productToDelete}`];
      }
      setCart(tempCart);
      */
      
      console.log("All items processed OK.")
    } catch (error) {
      console.error("handleCheckout error", error)
    }
  };
  // handleCheckout

  return (
    <div>
      <h1>
        {loggedInAs.first_name}'s Cart
      </h1>
      {listCartItems()}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  )
}