import axios from "axios";
import { useState, useEffect } from "react";
import RetailerProduct from "./RetailerProduct.jsx";
import Table from 'react-bootstrap/Table';

const API = process.env.REACT_APP_API_URL;

export default function RetailerProducts() {
  const [retailerProducts, setRetailerProducts] = useState([]);
  const [defaultSearch, setDefaultSearch] = useState("id");

  //sort function satisfies "front end calculation . . . displayed to user".
  useEffect(() => {
    axios.get(`${API}/products`)
      .then((response) => {
        console.log("search by", defaultSearch)
        setRetailerProducts(response.data.sort((product1, product2) => {
          if (product1[defaultSearch] < product2[defaultSearch]) {
            return -1;
          } if (product1[defaultSearch] > product2.id[defaultSearch]) {
            return 1;
          } else {
            return 0;
          }
        }))
      })
      .catch((e) => console.warn("catch", e));
  }, [defaultSearch])

  const sortme = (sortstring) => {
    setDefaultSearch(sortstring);
  };

  console.log("render");

  return (
    <div>
      <Table striped border-dark responsive className="text-overlay">
        <thead>
          <tr>
            <th>Product <span onClick={() => sortme("name")} className="mouseoverpointer">&#x2195;</span></th>
            <th>Description <span onClick={() => sortme("description")}className="mouseoverpointer">&#x2195;</span></th>
            <th>Price <span onClick={() => sortme("price")}className="mouseoverpointer">&#x2195;</span></th>
            <th>Qty <span onClick={() => sortme("quantity_in_stock")}className="mouseoverpointer">&#x2195;</span></th>
            <th>Card ID <span onClick={() => sortme("card_id")}className="mouseoverpointer">&#x2195;</span></th>
            <th>Rarity <span onClick={() => sortme("card_rarity")}className="mouseoverpointer">&#x2195;</span></th>
            <th>UPC <span onClick={() => sortme("product_upc")}className="mouseoverpointer">&#x2195;</span></th>
            <th>Go To Item</th>
          </tr>
        </thead>
        <tbody>
          {retailerProducts.map((product) => {
            return <RetailerProduct key={`RetailerProduct${product.id}`} product={product} />;
          })}
        </tbody>
      </Table>
    </div >
  );
}