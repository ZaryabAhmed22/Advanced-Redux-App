import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData } from "./store/cart-slice";
import { uiActions } from "./store/redux-index";

//Using this variable to avoid the Effect to run immidiately after the page reload and avoid sending an empty cart.
let isInitial = true;

function App() {
  //the redux tookit dispatches function
  const dispatch = useDispatch();

  //importing the showCart state using the useSelectore
  const showCart = useSelector((state) => state.ui.showCart);

  //importing whole cart from redux
  const cart = useSelector((state) => state.cart);

  //Getting the notification state from the state
  const notification = useSelector((state) => state.ui.notification);

  //Adding side Effects for sending http requests
  //1. PUT request so the data wil be overwritten
  //2. Setting cart as a depencency so the effect runs whenever the cart changes.
  //3. Later on added the dispatch as an dependency, though the dispatch will never trigger the effect as it will never change.
  useEffect(() => {
    //avoid the Effect to run immidiately after the page reload and avoid sending an empty cart.
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
