import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
// import service
import * as CartService from "../../service/cart/cartService";
import * as ProductService from "../../service/product/productService";
// import styles
import "../../styles/productdetail/productdetail.css";
// import components
import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";
import { Settingnav } from "../../components/navbar/Settingnav";
// import assets
import koiproduct from "../../assets/koiproduct.png";
// import slices
import { setQuantityItemInCart } from "../../redux/slices/navbar/navbar";

// convert to plain text
const stripHtmlTags = (html) => {
  const allowedTags = ["strong", "em", "b", "i", "u", "br", "h2", "h3"];
  const doc = new DOMParser().parseFromString(html, "text/html");
  const elements = doc.body.querySelectorAll("*");

  elements.forEach((el) => {
    if (!allowedTags.includes(el.tagName.toLowerCase())) {
      // Replace unwanted tags with their content
      el.replaceWith(...el.childNodes);
    }
  });
  return doc.body.innerHTML;
};
export const ProductDetail = () => {
  // dispatch
  const dispatch = useDispatch();
  // param
  const { productId } = useParams();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId || null;
  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [cartId, setCartId] = useState(null);
  const numericProductId = parseInt(productId);
  const {
    data: product = {},
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["productDetail", numericProductId],
    queryFn: () => ProductService.detailProductService(numericProductId),
    refetchOnWindowFocus: false,
  });
  const { data: cartInfo = {} } = useQuery({
    queryKey: ["my-cart", userId],
    queryFn: () => CartService.getCartByMember(userId),
  });
  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (cartInfo) {
      setCartId(cartInfo.cartId);
    }
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
  }, [isLoading, isFetching, isError, cartInfo]);
  // mutation
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["add-item-to-cart"],
    mutationFn: ({ cartId, productId, quantity }) =>
      CartService.addToCartByMember(cartId, productId, quantity),
    onSuccess: () => {
      toast.success("Product added", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      queryClient.invalidateQueries(["productDetail"]);
    },
  });
  const handleAddToCartMember = async (product) => {
    try {
      await mutation.mutateAsync({
        cartId,
        productId: product.productId,
        quantity: 1,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddToCartGuest = (product) => {
    CartService.addToCartByGuest(product);
    const guestCart = CartService.getCartByGuest() || [];
    toast.success("Product added", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    if (guestCart) {
      guestCart.reduce((total, item) => {
        dispatch(setQuantityItemInCart(total + item.quantity || 0));
      }, 0);
    }
  };
  // calculator
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  return (
    <div className="product-detail-container">
      <ToastContainer />
      <Navbar />
      <Settingnav />
      <div className="product-detail">
        <div className="product-detail-main">
          {serverError ? (
            <>
              <div className="error-page">
                <p>Server is closed now</p>
              </div>
            </>
          ) : (
            <>
              <img src={product.image} alt="" />
              <div className="product-detail-content">
                <small>{product.category && product.category.cateName}</small>
                <h2>{product.productName}</h2>
                <strong>{formatPrice(product.unitPrice)}</strong>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      product &&
                      stripHtmlTags(product.description || "No description"),
                  }}
                />
                <div>
                  <Link to={`/buynow/${productId}`}>BUY PRODUCT</Link>
                  {token && user ? (
                    <>
                      <button onClick={() => handleAddToCartMember(product)}>
                        ADD TO CART
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleAddToCartGuest(product)}>
                        ADD TO CART
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="product-detail-related">
          <strong>Explore Related Products</strong>
          <div className="product-detail-related-list">
            <div className="product-related-item">
              <img src={koiproduct} alt="" />
              <strong>Mazuri Koi Diet</strong>
              <p>$25.00</p>
              <button>Buy now</button>
            </div>
            <div className="product-related-item">
              <img src={koiproduct} alt="" />
              <strong>Mazuri Koi Diet</strong>
              <p>$25.00</p>
              <button>Buy now</button>
            </div>
            <div className="product-related-item">
              <img src={koiproduct} alt="" />
              <strong>Mazuri Koi Diet</strong>
              <p>$25.00</p>
              <button>Buy now</button>
            </div>
            <div className="product-related-item">
              <img src={koiproduct} alt="" />
              <strong>Mazuri Koi Diet</strong>
              <p>$25.00</p>
              <button>Buy now</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
