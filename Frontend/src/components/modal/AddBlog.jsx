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
import React, { useEffect, useState } from "react";
import FileResizer from "react-image-file-resizer";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { toggleAddBlogModal } from "../../redux/slices/modal/modal";
// import service
import * as BlogService from "../../service/blog/blogService";
export const AddBlog = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.userId;
  // dispatch
  const dispatch = useDispatch();
  // state
  const [previewImage, setPreviewImage] = useState(null);
  const [isValidName, setIsValidName] = useState(false);
  const [isPreventSubmit, setIsPreventSubmit] = useState(false);
  const [submitData, setSubmitData] = useState({
    title: "",
    userId: userId,
    image: "",
    content: "",
  });
  //   file resizer
  const resizeFile = (file) => {
    FileResizer.imageFileResizer(
      file,
      300,
      300,
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
  // mutation
  const queryCilent = useQueryClient();
  const mutation = useMutation({
    mutationFn: BlogService.createBlogService,
    onMutate: () => {
      setIsPreventSubmit(true);
    },
    onSuccess: () => {
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
      queryCilent.invalidateQueries({
        queryKey: ["myBlogs", "adminBlogs"],
      });
    },
  });
  //   handle func
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
  const removeChooseImage = () => {
    setPreviewImage(null);
    setSubmitData({
      ...submitData,
      image: "",
    });
  };
  const handleToggleAddPondModal = () => {
    dispatch(toggleAddBlogModal());
  };
  const handleSubmit = async (e) => {
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
      toast.error("Blog title must at least 10 characters and not a number", {
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

    if (!submitData.content || !submitData.title || !submitData.image) {
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
  useEffect(() => {
    console.log(submitData);
  }, [submitData]);
  return (
    <div className="add-blog-container">
      <ToastContainer />
      <div className="add-blog-modal">
        <div className="add-blog-header">
          <strong>Add Blog</strong>
          <i className="bx bx-x" onClick={handleToggleAddPondModal}></i>
        </div>
        <form action="" onSubmit={handleSubmit} className="add-blog-form">
          <div className="input-image">
            <i className="bx bx-trash-alt" onClick={removeChooseImage}></i>

            {previewImage ? (
              <label htmlFor="img">
                <img src={previewImage} alt="" />
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
              src=""
              alt=""
              onChange={(e) => resizeFile(e.target.files[0])}
            />
          </div>
          <div className="input-item">
            <label htmlFor="title"> Blog title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter blog title"
              onChange={handleOnChangeName}
            />
          </div>
          <div className="input-item">
            <label>Blog Content</label>
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
              onReady={(editor) => {
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setSubmitData({
                  ...submitData,
                  content: data,
                });
              }}
            />
          </div>
          <div className="submit">
            <button onClick={handleToggleAddPondModal}>Cancel</button>
            <button>Create confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
