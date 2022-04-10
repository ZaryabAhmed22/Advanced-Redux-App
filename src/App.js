import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
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

    //dispatching an action while sending the data
    dispatch(
      uiActions.setNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendCartData = async () => {
      const response = await fetch(
        "https://redux-e8d5e-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }

      const responseData = await response.json();

      //dispatching an action when the data is sent
      dispatch(
        uiActions.setNotification({
          status: "success",
          title: "Success!",
          message: "Cart data sent!",
        })
      );
    };

    sendCartData().catch((error) => {
      //dispatching an action when there's an error
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Error!",
          message: "There's an issue while sending data!",
        })
      );
    });
  }, [cart]);

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
