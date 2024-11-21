import React from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { toggleDeleteProductModal } from "../../redux/slices/modal/modal";
// import redux
import { useDispatch } from "react-redux";
// import service
import * as ProductService from "../../service/product/productService";
export const DelProduct = () => {
  // selector
  const productId = useSelector((state) => state.product.productId.productId);
  // mutation
  const queryCilent = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["del-product", productId],
    mutationFn: ProductService.deleteProductService,
    onSuccess: () => {
      toast.success("Delete successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        location.reload();
      }, 1500);
      queryCilent.invalidateQueries({
        queryKey: ["productList"],
      });
    },
  });
  // dispatch
  const dispatch = useDispatch();
  // handle func
  const handleToggleDelProductModal = () => {
    dispatch(toggleDeleteProductModal());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(productId);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="del-product-containter">
      <ToastContainer />
      <div className="del-product-modal">
        <div className="del-product-header">
          <strong>Delete Product</strong>
          <i className="bx bx-x" onClick={handleToggleDelProductModal}></i>
        </div>
        <div className="del-product-main">
          <p>Are you sure to delete product #{productId}</p>
        </div>
        <div className="submit">
          <button onClick={handleSubmit}>Delete Confirm</button>
        </div>
      </div>
    </div>
  );
};
