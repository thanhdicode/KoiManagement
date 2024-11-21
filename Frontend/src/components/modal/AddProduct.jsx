import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import React, { useState } from "react";
import FileResizer from "react-image-file-resizer";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/components/modal/modal.css";
// import slice
import { toggleAddProductModal } from "../../redux/slices/modal/modal";
// import service
import * as ProductService from "../../service/product/productService";

export const AddProduct = () => {
  // dispatch
  const dispatch = useDispatch();
  // state
  const [previewImage, setPreviewImage] = useState(null);
  const [submitData, setSubmitData] = useState({
    name: "",
    image: "",
    stock: "",
    unitprice: "",
    description: "",
    categoryId: "",
    status: true,
  });
  const [invalidNumber, setInvalidNumber] = useState(null);
  const [isValidName, setIsValidName] = useState(false);
  const [isPreventSubmit, setIsPreventSubmit] = useState(false);

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
    mutationFn: ProductService.createProductService,
    onMutate: () => {
      setIsPreventSubmit(true);
    },
    onSuccess: (responseData) => {
      if (responseData && responseData.code === "STOCK_INVALID") {
        toast.error("Stock must at least 0", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (responseData && responseData.error === "Bad Request") {
        toast.error("Something was wrong !!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.success("Create successfully", {
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
      }
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
  const handleToggleAddProductModal = () => {
    dispatch(toggleAddProductModal());
  };
  const handleInputNumber = (e) => {
    const { name, value } = e.target;
    if (isNaN(value)) {
      setSubmitData({
        ...submitData,
        [name]: "",
      });
      setInvalidNumber("Please input invalid number");
      return;
    }
    setSubmitData({
      ...submitData,
      [name]: parseInt(value),
    });
    setInvalidNumber(null);
  };
  const handleInputFloat = (e) => {
    const { name, value } = e.target;
    if (isNaN(value)) {
      setSubmitData({
        ...submitData,
        [name]: "",
      });
      setInvalidNumber("Please input invalid number");
      return;
    }
    setSubmitData({
      ...submitData,
      [name]: parseFloat(value),
    });
    setInvalidNumber(null);
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
    if (invalidNumber) {
      toast.error("Price and stock must be a number", {
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
      // setRequiredField("All fields are required");
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
    <div className="add-product-container">
      <ToastContainer />
      <div className="add-product-modal">
        <div className="add-product-header">
          <strong>Create A Product</strong>
          <i className="bx bx-x" onClick={handleToggleAddProductModal}></i>
        </div>
        <form
          action=""
          onSubmit={handleSubmitForm}
          autoComplete="off"
          className="add-product-detail"
        >
          <div className="field input-image">
            <i className="bx bx-trash-alt" onClick={removeChooseImage}></i>

            {previewImage ? (
              <label htmlFor="img" className="image-preview">
                <img src={previewImage} alt="Preview" />
              </label>
            ) : (
              <label htmlFor="img" className="image-placeholder">
                <i className="bx bx-image-add"></i>
                <p>Choose An Image</p>
              </label>
            )}

            <input
              type="file"
              id="img"
              name="img"
              onChange={(e) => resizeFile(e.target.files[0])}
            />
          </div>

          <div className="input-field-name">
            <label htmlFor="name" className="field-label">
              Product Name
            </label>
            <input
              id="name"
              className="name"
              type="text"
              onChange={handleOnChangeName}
              name="name"
              placeholder="Enter product name"
            />
          </div>

          <div className="input-two-fields">
            <div className="input-field">
              <label htmlFor="unitprice" className="field-label">
                Price
              </label>
              <input
                id="unitprice"
                type="text"
                name="unitprice"
                placeholder="Enter price"
                onChange={handleInputFloat}
              />
            </div>
            <div className="input-field">
              <label htmlFor="stock" className="field-label">
                Stock
              </label>
              <input
                id="stock"
                type="text"
                name="stock"
                placeholder="Enter stock quantity"
                onChange={handleInputNumber}
              />
            </div>
          </div>
          <div className="input-field-des">
            <label>Description</label>
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
              data=""
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
            <label>Category</label>
            <select
              className="cate"
              onChange={handleInputNumber}
              name="categoryId"
              id="categoryId"
            >
              <option value="">Select Category</option>
              <option value="1">Koi Health Treatment</option>
              <option value="2">Water Parameter Improvement</option>
            </select>
          </div>

          <div className="submit">
            <span onClick={handleToggleAddProductModal}>Cancel</span>
            <button type="submit">Create Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
