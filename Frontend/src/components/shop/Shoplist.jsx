import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import service
import * as CartService from "../../service/cart/cartService";
import * as CategoryService from "../../service/category/categoryService";
import * as ProductService from "../../service/product/productService";
// import styles
import "../../styles/components/shop/shop.css";
// import slice
import { setQuantityItemInCart } from "../../redux/slices/navbar/navbar";
export const Shoplist = ({
  isLoadingList,
  infinityScroll,
  isRow,
  isColumn,
}) => {
  // navigate
  const navigate = useNavigate();
  // param
  const { cateId } = useParams();
  // dispatch
  const dispatch = useDispatch();
  //
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId || null;
  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [productFromCate, setProductFromCate] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [serverError, setServerError] = useState(null);
  // query
  const {
    data: products = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["products", cateId],
    queryFn: () =>
      cateId
        ? CategoryService.getProductCategory(cateId)
        : ProductService.getAllProductShop(),
    refetchOnWindowFocus: false,
  });
  const { data: cartInfo = {} } = useQuery({
    queryKey: ["my-cart", userId],
    queryFn: () => CartService.getCartByMember(userId),
  });
  const { data: cateList = [] } = useQuery({
    queryKey: ["category"],
    queryFn: CategoryService.getAllCategory,
  });

  // use effect
  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (cartInfo) {
      setCartId(cartInfo.cartId);
    }
    if (cateId) {
      setProductFromCate(
        Array.isArray(products?.products) ? products.products : []
      );
    } else {
      setProductFromCate([]);
    }
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
  }, [isLoading, isFetching, cartInfo, isError]);
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
      queryClient.invalidateQueries(["products"]);
    },
  });

  // handle func
  const handleAddToCart = async (product) => {
    if (user && token && cartId) {
      try {
        await mutation.mutateAsync({
          cartId,
          productId: product.productId,
          quantity: 1,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
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
    }
  };
  const handleSearching = (e) => {
    setSearchData(e.target.value);
  };
  const filteredProducts = cateId
    ? productFromCate?.filter((product) =>
        product?.productName.toLowerCase().includes(searchData.toLowerCase())
      )
    : products?.filter((product) =>
        product?.productName.toLowerCase().includes(searchData.toLowerCase())
      );
  // calculator
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  return (
    <>
      {products.length === 0 ? (
        <>
          <div className="empty-shop">
            <p>Sorry, our products is empty or out of stock</p>
          </div>
        </>
      ) : (
        <>
          <div className="shopnav-container">
            <nav className="shopnav">
              <div className="shopnav-item">
                <strong>Search</strong>
                <input
                  type="text"
                  placeholder="Search for product name..."
                  value={searchData}
                  onChange={handleSearching}
                />
              </div>
              <div className="shopnav-item">
                <strong>Category</strong>
                <div className="shopnav-item-link">
                  <Link to="/shop">All Products</Link>
                  {cateList.map((category) => (
                    <Link
                      to={`/shop/category/${category.cateId}`}
                      key={category.cateId}
                    >
                      {category.cateName}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
          <div className="shoplist-container">
            <ToastContainer />
            {serverError ? (
              <div className="error-page">
                <p>{serverError}</p>
              </div>
            ) : (
              <>
                {filteredProducts.length === 0 ? (
                  <>
                    <div className="empty-search">
                      <p>Product you are looking for is not found</p>
                    </div>
                  </>
                ) : (
                  <>
                    {cateId ? (
                      <>
                        {isColumn ? (
                          <>
                            <div className="shoplist-column">
                              {filteredProducts
                                .slice(0, infinityScroll)
                                .map((product) => (
                                  <div
                                    className="shop-item"
                                    key={product.productId}
                                  >
                                    <img src={product.image} alt="image" />
                                    <Link
                                      to={`/productdetail/${product.productId}`}
                                    >
                                      {product.productName}
                                    </Link>
                                    <p>{formatPrice(product.unitPrice)}</p>
                                    <div>
                                      <Link
                                        className="buynow"
                                        to={`/buynow/${product.productId}`}
                                      >
                                        Buy now
                                      </Link>
                                      <button
                                        onClick={() => handleAddToCart(product)}
                                      >
                                        Add to cart
                                      </button>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                        {isRow ? (
                          <>
                            <div className="shoplist-row">
                              {filteredProducts
                                .slice(0, infinityScroll)
                                .map((product) => (
                                  <div
                                    className="shop-item"
                                    key={product.productId}
                                  >
                                    <img src={product.image} alt="image" />
                                    <Link
                                      to={`/productdetail/${product.productId}`}
                                    >
                                      {product.productName}
                                    </Link>
                                    <p>{formatPrice(product.unitPrice)}</p>
                                    <div>
                                      <Link
                                        className="buynow"
                                        to={`/buynow/${product.productId}`}
                                      >
                                        Buy now
                                      </Link>
                                      <button
                                        onClick={() => handleAddToCart(product)}
                                      >
                                        Add to cart
                                      </button>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <>
                        {isColumn ? (
                          <>
                            <div className="shoplist-column">
                              {filteredProducts
                                .slice(0, infinityScroll)
                                .map((product) => (
                                  <div
                                    className="shop-item"
                                    key={product.productId}
                                  >
                                    <img src={product.image} alt="image" />
                                    <Link
                                      to={`/productdetail/${product.productId}`}
                                    >
                                      {product.productName}
                                    </Link>
                                    <p>{formatPrice(product.unitPrice)}</p>
                                    <div>
                                      <Link
                                        className="buynow"
                                        to={`/buynow/${product.productId}`}
                                      >
                                        Buy now
                                      </Link>
                                      <button
                                        onClick={() => handleAddToCart(product)}
                                      >
                                        Add to cart
                                      </button>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                        {isRow ? (
                          <>
                            <div className="shoplist-row">
                              {filteredProducts
                                .slice(0, infinityScroll)
                                .map((product) => (
                                  <div
                                    className="shop-item"
                                    key={product.productId}
                                  >
                                    <img src={product.image} alt="image" />
                                    <Link
                                      to={`/productdetail/${product.productId}`}
                                    >
                                      {product.productName}
                                    </Link>
                                    <p>{formatPrice(product.unitPrice)}</p>
                                    <div>
                                      <Link
                                        className="buynow"
                                        to={`/buynow/${product.productId}`}
                                      >
                                        Buy now
                                      </Link>
                                      <button
                                        onClick={() => handleAddToCart(product)}
                                      >
                                        Add to cart
                                      </button>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};
