import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Error from "./pages/Error.jsx";
import About from "./pages/About.jsx";

import Customers from "./components/Customers/Customers.jsx";
import NewCustomer from "./components/Customers/NewCustomer.jsx";
import CustomerDetails from "./components/Customers/CustomerDetails.jsx";
import EditCustomer from "./components/Customers/EditCustomer.jsx";
import CustomerCart from "./components/Customers/CustomerCart.jsx";
import CustomerHistory from "./components/Customers/CustomerHistory.jsx";

import Products from "./components/Products/Products.jsx";
import Product from "./components/Products/Product.jsx";

import RetailerProducts from "./components/Retailers/RetailerProducts.jsx";
import RetailerNewProduct from "./components/Retailers/RetailerNewProduct.jsx";
import RetailerEditProduct from "./components/Retailers/RetailerEditProduct.jsx";
import RetailerShowProduct from "./components/Retailers/RetailerShowProduct.jsx"

function App() {
  const [loggedInAs, setLoggedInAs] = useState({
    id: 1,
    first_name: "Guest",
    last_name: "User",
    email:  "guestuser@nomail.com",
    phone:  "(000) 000-0000",
    address_street: "123 Elf Road",
    address_street2: null,
    address_city:  "North Pole",
    address_state: "Sea Ice",
    address_postal_code: "88888",
    payment_info: "Payment: Coal"
  });
  /*
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  email VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  address_street VARCHAR(60) NOT NULL,
  address_street2 VARCHAR(30),
  address_city VARCHAR(80) NOT NULL,
  address_state VARCHAR(40) NOT NULL,
  address_postal_code VARCHAR(40) NOT NULL,
  payment_info TEXT NOT NULL
  */
  const [cart, setCart] = useState({});

  return (
    <div className="App">
      <Router>
        <header>
          <NavBar loggedInAs={loggedInAs} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route exact path="/customers" element={<Customers setLoggedInAs={setLoggedInAs} />} />
            <Route exact path="/customers/new" element={<NewCustomer />} />
            <Route exact path="/customers/:id" element={<CustomerDetails setLoggedInAs={setLoggedInAs}/>} />
            <Route exact path="/customers/:id/edit" element={<EditCustomer setLoggedInAs={setLoggedInAs} />} />
            <Route exact path="/customers/:id/cart" element={<CustomerCart loggedInAs={loggedInAs} customerCart={cart[`customer${loggedInAs.id}`]} cart={cart} setCart={setCart} />} />
            <Route exact path="/customers/:id/history" element={<CustomerHistory loggedInAs={loggedInAs} />} />

            <Route path="/products" element={<Products cart={cart} setCart={setCart} loggedInAs={loggedInAs}/>} />
            <Route path="/products/:id" element={<Product />} />
            
            <Route path="/retailer/products" element={<RetailerProducts />} />
            <Route path="/retailer/products/new" element={<RetailerNewProduct />} />
            <Route exact path="/retailer/products/:id" element ={<RetailerShowProduct />} />
            <Route exact path="/retailer/products/:id/edit" element={<RetailerEditProduct />} />
            
            <Route path="/about" element={<About />} />

            <Route path="/*" element={<Error />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </Router>
    </div>
  );
}

export default App;