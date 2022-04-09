import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/redux-index";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartQty = useSelector((state) => state.cart.totalQty);
  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart());
  };
  return (
    <button onClick={toggleCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQty}</span>
    </button>
  );
};

export default CartButton;
