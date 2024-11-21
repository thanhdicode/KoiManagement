import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import styles
import "../../styles/components/navbar/navbar.css";
// import assets
import logo from "../../assets/logo.png";
// import slices
import {
  setQuantityItemInCart,
  toggleSettingNav,
} from "../../redux/slices/navbar/navbar";
// import service
import * as CartService from "../../service/cart/cartService";
import { scroller } from "react-scroll";
export const Navbar = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId || null;
  const currentCart = JSON.parse(localStorage.getItem("cart"));
  // selector
  const totalItemInCart = useSelector(
    (state) => state.navbar.itemInCart.quantity
  );
  // state
  const [isEmptyCart, setIsEmptyCart] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [isEmptyCartGuest, setIsEmptyCartGuest] = useState(false);
  // query
  const { data: cartInfo = {} } = useQuery({
    queryKey: ["my-cart", userId],
    queryFn: () => CartService.getCartByMember(userId),
    enabled: !!userId,
  });
  const [isAuth, setIsAuth] = useState(false);
  // navigate
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();
  // handle func
  const handleToggleSettingnav = () => {
    dispatch(toggleSettingNav());
  };

  const handleSetIsAuth = () => {
    if (!token && !user) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  };
  const totalQuantityGuestCart = () => {
    return Array.isArray(currentCart)
      ? currentCart.reduce((total, item) => total + (item.quantity || 0), 0)
      : 0;
  };
  useEffect(() => {
    handleSetIsAuth();

    if (token && user) {
      if (cartInfo) {
        setCartList(cartInfo.cartItems || []);
        setIsEmptyCart(!cartInfo.cartItems || cartInfo.cartItems.length === 0);
      }
    } else {
      const totalQuantityGuest = totalQuantityGuestCart();
      if (totalItemInCart === 0) {
        setIsEmptyCartGuest(true);
      } else {
        setIsEmptyCartGuest(false);
      }
      dispatch(setQuantityItemInCart(totalQuantityGuest));
    }
  }, [cartInfo, currentCart, token]);
  // calculate
  const totalQuantity = () => {
    return Array.isArray(cartList)
      ? cartList.reduce((total, item) => {
          return total + (item.quantity || 0);
        }, 0)
      : 0;
  };
  const handleScrollTo = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -85,
    });
  };
  return (
    <div className="navbar-container">
      {token && user ? (
        <>
          <div className="navbar-main">
            <Link to="/?section=contact">
              <img src={logo} alt="" />
            </Link>
            <Link onClick={() => handleScrollTo("homepage")}>
              What Is Izumiya?
            </Link>
            <Link to="/shop">Shop</Link>
            <Link onClick={() => handleScrollTo("solutions")}>Solutions</Link>
            <Link to="/About">About</Link>
            <Link onClick={() => handleScrollTo("contact")}>Contact</Link>
            <Link to="/blog">Blog</Link>
          </div>
          {isAuth ? (
            <div className="navbar-third">
              {isEmptyCart ? (
                <>
                  <Link to="/cart">
                    <i className="bx bx-cart"></i>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/cart">
                    <i className="bx bxs-cart"></i>
                    <p>{totalQuantity()}</p>
                  </Link>
                </>
              )}
              <div className="info" onClick={handleToggleSettingnav}>
                <strong>{user.fullname}</strong>
                <i className="bx bx-chevron-down"></i>
              </div>
            </div>
          ) : (
            <div className="navbar-second">
              <Link to="/cart">
                <i className="bx bx-cart"></i>
              </Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="navbar-main">
            <img src={logo} alt="" onClick={() => navigate("/")} />
            <Link to="/#about">What Is Izumiya?</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/#solution">Solutions</Link>
            <a href="">About</a>
            <a href="">Contact</a>
            <Link to="/blog">Blog</Link>
          </div>
          <div className="navbar-second">
            {isEmptyCartGuest ? (
              <>
                <Link to="/cart">
                  <i className="bx bx-cart"></i>
                </Link>
              </>
            ) : (
              <>
                <Link to="/cart">
                  <i className="bx bxs-cart"></i>
                  <p>{totalItemInCart}</p>
                </Link>
              </>
            )}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </>
      )}
    </div>
  );
};
