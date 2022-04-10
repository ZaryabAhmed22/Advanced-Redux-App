import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const showCart = useSelector((state) => state.ui.showCart);

  //importing whole cart from redux
  const cart = useSelector((state) => state.cart);

  //Adding side Effects for sending http requests
  //1. PUT request so the data wil be overwritten
  //2. Setting cart as a depencency so the effect runs whenever the cart changes.
  useEffect(() => {
    fetch("https://redux-e8d5e-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT",
      body: JSON.stringify(cart),
    });
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
