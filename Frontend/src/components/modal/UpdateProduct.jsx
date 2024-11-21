import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Alignment,
  BlockQuote,
  Bold,
  ClassicEditor,
  Essentials,
  Font,
  Heading,
  Image,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  Italic,
  Link,
  List,
  Paragraph,
  Table,
  TableToolbar,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import React, { useEffect, useState } from "react";
import FileResizer from "react-image-file-resizer";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/components/modal/modal.css";
// import slice
import { toggleUpdateProductModal } from "../../redux/slices/modal/modal";
// import service
import * as ProductService from "../../service/product/productService";

export const UpdateProduct = () => {
  // selector
  const productId = useSelector((state) => state.product.productId.productId);
  // dispatch
  const dispatch = useDispatch();
  //   query
  const {
    data: productInfo = {},
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => ProductService.detailProductService(productId),
  });
  // state
  const [previewImage, setPreviewImage] = useState(null);
  const [isValidName, setIsValidName] = useState(false);
  const [submitData, setSubmitData] = useState({
    name: "",
    image: "",
    stock: "",
    unitprice: "",
    description: "",
    categoryId: "",
    status: "",
  });
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isValidNumber, setIsValidNumber] = useState(false);
  const [isPreventSubmit, setIsPreventSubmit] = useState(false);
  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (productInfo) {
      setSubmitData({
        name: productInfo.productName || "",
        image: productInfo.image || "",
        stock: productInfo.stock || "",
        unitprice: productInfo.unitPrice || "",
        description: productInfo.description || "",
        categoryId: productInfo.category?.cateId || "",
        status: productInfo.status || "",
      });

      if (productInfo.image) {
        setPreviewImage(productInfo.image);
      }
    }
  }, [productInfo, isFetching, isLoading]);
  //   file resizer
  const resizeFile = (file) => {
    FileResizer.imageFileResizer(
      file,
      200,
      200,
      "PNG",
      100,
      0,
      (uri) => {
        setPreviewImage(uri);
        setSubmitData({
          ...submitData,
          image: uri,
        });
      },
      "base64",
      250,
      250
    );
  };
  //   mutation
  const queryCilent = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-product", productId],
    onMutate: () => {
      setIsPreventSubmit(true);
    },
    mutationFn: (updateData) => {
      ProductService.updateProductService(productId, updateData);
    },
    onSuccess: () => {
      toast.success("Update successfully", {
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
  //   handle func
  const removeChooseImage = () => {
    setPreviewImage(null);
    setSubmitData({
      ...submitData,
      image: "",
    });
  };
  const handleToggleUpdateProductModal = () => {
    dispatch(toggleUpdateProductModal());
  };
  const handleInputNumber = (e) => {
    const { name, value } = e.target;
    if (isNaN(value)) {
      setSubmitData({
        ...submitData,
        [name]: "",
      });
      setIsValidNumber(true);
      return;
    }
    setSubmitData({
      ...submitData,
      [name]: parseInt(value),
    });
    setIsValidNumber(false);
  };
  const handleInputFloat = (e) => {
    const { name, value } = e.target;
    if (isNaN(value)) {
      setSubmitData({
        ...submitData,
        [name]: "",
      });
      setIsValidNumber(true);
      return;
    }

    setSubmitData({
      ...submitData,
      [name]: parseFloat(value),
    });
    setIsValidNumber(false);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };
  const handleOnChangeName = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      setSubmitData({
        ...submitData,
        [name]: "",
      });
      setIsValidName(true);
      return;
    }
    if (value.length < 10) {
      setSubmitData({
        ...submitData,
        [name]: "",
      });
      setIsValidName(true);
      return;
    }
    setSubmitData({
      ...submitData,
      [name]: value,
    });
    setIsValidName(false);
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (isPreventSubmit) {
      toast.error("On going process, try again later", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (isValidName) {
      toast.error("Product name must at least 10 characters and not a number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    // number validation
    if (isValidNumber) {
      toast.error("Invalid number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    // empty validation
    if (
      !submitData.name ||
      !submitData.categoryId ||
      !submitData.image ||
      !submitData.stock ||
      !submitData.unitprice ||
      !submitData.description ||
      !submitData.status
    ) {
      toast.error("All fields are required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      await mutation.mutateAsync(submitData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="update-product-container">
      <ToastContainer />
      <div className="update-product-modal">
        {isLoadingPage ? (
          <>
            <div className="loading">
              <ClipLoader color="#000000" size={40} />
            </div>
          </>
        ) : (
          <>
            <div className="update-product-header">
              <strong>Update Product</strong>
              <i
                className="bx bx-x"
                onClick={handleToggleUpdateProductModal}
              ></i>
            </div>
            <form
              action=""
              autoComplete="off"
              onSubmit={handleSubmitForm}
              className="update-product-detail"
            >
              <div className="input-image">
                <i className="bx bx-trash-alt" onClick={removeChooseImage}></i>
                {previewImage ? (
                  <label htmlFor="img">
                    <img src={previewImage} alt="Selected" />
                  </label>
                ) : (
                  <label htmlFor="img">
                    <i className="bx bx-image-add"></i>
                    <p>Choose An Image</p>
                  </label>
                )}
                <input
                  type="file"
                  id="img"
                  onChange={(e) => resizeFile(e.target.files[0])}
                />
              </div>

              <div className="input-field-name">
                <label htmlFor="name">Product Name</label>
                <input
                  className="name"
                  type="text"
                  onChange={handleOnChangeName}
                  defaultValue={submitData.name}
                  name="name"
                  placeholder="Product name"
                  id="name"
                />
              </div>

              <div className="input-two-fields">
                <div className="input-field">
                  <label htmlFor="unitprice">Price</label>
                  <input
                    type="text"
                    name="unitprice"
                    placeholder="Price"
                    defaultValue={submitData.unitprice}
                    onChange={handleInputFloat}
                    id="unitprice"
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="text"
                    name="stock"
                    placeholder="Stock"
                    defaultValue={submitData.stock}
                    onChange={handleInputNumber}
                    id="stock"
                  />
                </div>
              </div>

              <div className="input-field-des">
                <label htmlFor="description">Description</label>
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    plugins: [
                      Essentials,
                      Bold,
                      Italic,
                      Paragraph,
                      Heading,
                      Link,
                      List,
                      BlockQuote,
                      Alignment,
                      Image,
                      ImageToolbar,
                      ImageStyle,
                      ImageResize,
                      Table,
                      TableToolbar,
                      Font,
                    ],
                    toolbar: [
                      "heading",
                      "|",
                      "bold",
                      "italic",
                      "link",
                      "bulletedList",
                      "numberedList",
                      "|",
                      "blockQuote",
                      "alignment",
                      "fontSize",
                      "|",
                      "imageUpload",
                      "insertTable",
                      "|",
                      "undo",
                      "redo",
                    ],
                    image: {
                      toolbar: [
                        "imageTextAlternative",
                        "imageStyle:full",
                        "imageStyle:side",
                      ],
                      styles: ["full", "side"],
                    },
                    table: {
                      contentToolbar: [
                        "tableColumn",
                        "tableRow",
                        "mergeTableCells",
                      ],
                    },
                  }}
                  data={submitData.description}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setSubmitData({
                      ...submitData,
                      description: data,
                    });
                  }}
                />
              </div>

              <div className="input-field-cate">
                <label htmlFor="categoryId">Category</label>
                <select
                  className="cate"
                  onChange={handleInputNumber}
                  name="categoryId"
                  id="categoryId"
                  value={submitData.categoryId || ""}
                >
                  <option value="">Category</option>
                  <option value="1">Koi Health Treatment</option>
                  <option value="2">Water Parameter Improvement</option>
                </select>
              </div>

              <div className="input-field-cate">
                <label htmlFor="status">Status</label>
                <select
                  className="cate"
                  onChange={handleOnChange}
                  name="status"
                  id="status"
                  defaultValue={submitData.status ? "true" : "false"}
                >
                  <option value="">Status</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              <div className="submit">
                <span onClick={handleToggleUpdateProductModal}>Cancel</span>
                <button type="submit">Update Confirm</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
