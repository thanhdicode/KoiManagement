import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../styles/components/product/product.css";
// import service
import * as ProductService from "../../service/product/productService";
// import slices
import {
  toggleDeleteProductModal,
  toggleUpdateProductModal,
} from "../../redux/slices/modal/modal";
import { setProductId } from "../../redux/slices/product/product";

export const ProductList = ({ searchTerm }) => {
  // Accept searchTerm as prop
  const dispatch = useDispatch();
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [emptyList, setEmptyList] = useState(null);
  const [serverError, setServerError] = useState(null);
  // query
  const {
    data: products = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["productList"],
    queryFn: ProductService.getAllProductAdmin,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (products.length === 0) {
      setEmptyList("Product list is empty");
    } else {
      setEmptyList(null);
    }
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }

    setIsLoadingPage(isFetching || isLoading);
  }, [isFetching, isLoading, isError]);

  // Filter products based on searchTerm
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleUpdateProductModal = (id) => {
    dispatch(setProductId(id));
    dispatch(toggleUpdateProductModal());
  };

  const handleToggleDelProductModal = (id) => {
    dispatch(setProductId(id));
    dispatch(toggleDeleteProductModal());
  };
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  return (
    <>
      <table className="product-list-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {serverError ? (
            <div className="error-page">
              <p>{serverError}</p>
            </div>
          ) : isLoadingPage ? (
            <div className="loading">
              <ClipLoader color="#000000" size={40} />
            </div>
          ) : emptyList ? (
            <div className="empty-list">
              <p>{emptyList}</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>
                  <i className="bx bxs-package"></i>
                  <div>
                    <strong>{product.productName}</strong>
                    <p>{product.category && product.category.cateName}</p>
                  </div>
                </td>
                <td>
                  <img src={product.image} alt="" />
                </td>
                <td>{formatPrice(product.unitPrice)}</td>
                <td>{product.stock}</td>
                <td>{product.status ? "Active" : "Inactive"}</td>
                <td>
                  <i
                    className="bx bxs-edit-alt"
                    onClick={() =>
                      handleToggleUpdateProductModal(product.productId)
                    }
                  ></i>
                  <i
                    className="bx bxs-trash-alt"
                    onClick={() =>
                      handleToggleDelProductModal(product.productId)
                    }
                  ></i>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};
