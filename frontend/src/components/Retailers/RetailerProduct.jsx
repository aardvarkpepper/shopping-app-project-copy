import { Link } from "react-router-dom";

export default function RetailerProduct({ product }) {

    return (
        <tr>
            <td className="px-2 py-2">
                {product.name}
            </td>
            <td className="px-2 py-2">
                {product.description}
            </td>
            <td className="px-2 py-2">
                ${product.price}
            </td>
            <td className="px-2 py-2 centertext">
                {product.quantity_in_stock}
            </td>
            <td className="px-2 py-2">
                {product.card_id}
            </td>
            <td className="px-2 py-2">
                {product.card_rarity}
            </td>
            <td className="px-2 py-2">
                {product.product_upc}
            </td>
            <td className="px-2 py-2">
                <Link to={`/retailer/products/${product.id}`}>Show Product</Link>
            </td>
        </tr>
    );
}