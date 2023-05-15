import { Link } from "react-router-dom";
import { gimmeSpace } from "../../utilities/utilityFunctions";

export default function RetailerProduct({ product }) {

    return (
        <tr>
            <td>
                {product.name}
            </td>
            <td>
                {product.description}
            </td>
            <td>
                ${product.price}
            </td>
            <td>
                {product.quantity_in_stock}
            </td>
            <td>
                {product.card_id}
            </td>
            <td>
                {product.card_rarity}
            </td>
            <td>
                {product.product_upc}
            </td>
            <td className="tabletextlink">
                <Link to={`/retailer/products/${product.id}`}>
                    <span className="slidyfunfun tabletext">
                        Show Product{gimmeSpace(1)}
                    </span>
                </Link>
            </td>
        </tr>
    );
}