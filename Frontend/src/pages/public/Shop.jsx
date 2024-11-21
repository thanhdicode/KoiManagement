import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import styles
import "../../styles/shop/shop.css";
// import components
import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";
import { Settingnav } from "../../components/navbar/Settingnav";
import { Shoplist } from "../../components/shop/Shoplist";
// import service
import * as ProductService from "../../service/product/productService";
import * as CategoryService from "../../service/category/categoryService";
export const Shop = () => {
  // param
  const { cateId } = useParams();
  // state
  const [isAuth, setIsAuth] = useState(false);
  const [infinityScroll, setInfinityScroll] = useState(6);
  const [endShop, setEndShop] = useState(null);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [productFromCate, setProductFromCate] = useState([]);
  const [isRow, setIsRow] = useState(false);
  const [isColumn, setIsColumn] = useState(true);
  const [serverError, setServerError] = useState(null);
  // query
  const { data: products = [], isError } = useQuery({
    queryKey: ["products", cateId],
    queryFn: () =>
      cateId
        ? CategoryService.getProductCategory(cateId)
        : ProductService.getAllProductShop(),
    refetchOnWindowFocus: false,
  });
  const { data: productCate = {} } = useQuery({
    queryKey: ["products", cateId],
    queryFn: () => CategoryService.getProductCategory(cateId),
    refetchOnWindowFocus: false,
  });

  // handle func
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSetIsAuth = () => {
    if (!token && !user) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  };
  const handlePagination = () => {
    if (infinityScroll < products.length) {
      setIsLoadingList(true);
      setTimeout(() => {
        setInfinityScroll(infinityScroll + 6);
        setIsLoadingList(false);
      }, 1000);
    }
  };
  const handleSetRow = () => {
    setIsRow(true);
    setIsColumn(false);
  };
  const handleSetColumn = () => {
    setIsRow(false);
    setIsColumn(true);
  };
  useEffect(() => {
    handleSetIsAuth();

    if (cateId) {
      const productsInCategory = Array.isArray(products?.products)
        ? products.products
        : [];
      setProductFromCate(productsInCategory);
    } else {
      setProductFromCate([]);
    }

    if (cateId && productFromCate.length > 0) {
      if (infinityScroll >= productFromCate.length) {
        setEndShop("You have reached the last product in this category");
      } else {
        setEndShop(null);
      }
    } else if (!cateId && products.length > 0) {
      if (infinityScroll >= products.length) {
        setEndShop("You have reached the last product");
      } else {
        setEndShop(null);
      }
    }

    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
  }, [cateId, products, infinityScroll, isError]);

  return (
    <div className="shop-container">
      <Navbar />
      {isAuth && <Settingnav />}
      <div className="shop">
        <div className="shop-header">
          <strong>IZUMIYA SHOP</strong>
          <p>
            You will find all of the best products for your koi from our
            suppliers.
          </p>
        </div>
        <div className="shop-main">
          <div className="shop-main-header">
            {cateId ? (
              <>
                <strong>{productCate?.cateName}</strong>
              </>
            ) : (
              <>
                <strong>All Products</strong>
              </>
            )}
            <div className="header-filter">
              {cateId ? (
                <>
                  <p>{productCate?.products?.length} products</p>
                </>
              ) : (
                <>
                  <p>{products.length} products</p>
                </>
              )}
              <i
                className="bx bx-grid-horizontal"
                onClick={handleSetColumn}
              ></i>
              <i className="bx bx-grid-vertical" onClick={handleSetRow}></i>
              <select name="" id="">
                <option value="">Filter</option>
                <option value="">Filter</option>
                <option value="">Filter</option>
                <option value="">Filter</option>
              </select>
            </div>
          </div>
          <div className="shop-main-list">
            <Shoplist
              infinityScroll={infinityScroll}
              isLoadingList={isLoadingList}
              isRow={isRow}
              isColumn={isColumn}
            />
          </div>

          {serverError ? (
            <>
              <div className="error-page">
                <p></p>
              </div>
            </>
          ) : (
            <>
              {endShop ? (
                ""
              ) : (
                <>
                  {products.length === 0 ? (
                    ""
                  ) : (
                    <>
                      <div className="infinity-scroll">
                        <strong onClick={handlePagination}>
                          Load more products...
                        </strong>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
