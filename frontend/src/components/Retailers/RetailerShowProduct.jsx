import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { gimmeSpace } from "../../utilities/utilityFunctions";
const API = process.env.REACT_APP_API_URL

export default function RetailerShowProduct() {
    const [product, setProduct] = useState([]);
    const [refString, setRefString] = useState("");
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${API}/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setRefString (require(`../Products${response.data.image_url.slice(1)}`))
            }).catch((e) => {
                console.warn("catch", e);
            })
    }, [id]);

    return (
        <div className="centertext">
            <h1>{product.name}</h1>
            <h5>{product.description}</h5>
            <img src={refString} alt={`${product.description}`} style={{ "width": "200px" }}></img>
            <p>${product.price} per</p>
            <p>Quantity in stock:  {product.quantity_in_stock}</p>
            <p>Card ID:  {product.card_id}</p>
            <p>Rarity: {product.card_rarity}</p>
            <p>UPC:  {product.product_upc}</p>
            <Link to={`/retailer/products/${product.id}/edit`}>
                <button className="slidyfunfun">Edit {gimmeSpace(1)}</button>
            </Link>
        </div >
    )
}