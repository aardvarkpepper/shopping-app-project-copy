import OrderAddProduct from "../Orders/OrderAddProduct.jsx";

export default function Product({ product, cart, setCart, loggedInAs }) {

  return (
    <div className="Product centertext">
      <div className="productNameContainer">
        <h1 className="productName">{product.name}</h1>
      </div>
      <h5>{product.description}</h5>
      <img src={require(`${product.image_url}`)} alt={`${product.description}`} className="productImage" ></img>
      <p>${product.price} per</p>
      <p>Quantity in stock:  {product.quantity_in_stock}</p>
      <p>Rarity: {product.card_rarity}</p>
      <p>Card ID:  {product.card_id}</p>
      <p>UPC:  {product.product_upc}</p>
      <OrderAddProduct
        key={`OrderAddProduct${product.id}`}
        productID={product.id}
        productInStock={product.quantity_in_stock}
        cart={cart}
        setCart={setCart}
        loggedInAs={loggedInAs}
      />
    </div>
  )
}