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
import FileResizer from "react-image-file-resizer";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { useEffect, useState } from "react";
import { toggleUpdateBlogModal } from "../../redux/slices/modal/modal";
// import service
import * as BlogService from "../../service/blog/blogService";
export const UpdateBlog = () => {
  // param
  const { blogId } = useParams();
  // dispatch
  const dispatch = useDispatch();
  // query
  const { data: blogInfo = {} } = useQuery({
    queryKey: ["blogDetail", blogId],
    queryFn: () => BlogService.detailBlogService(blogId),
  });
  // state
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreventSubmit, setIsPreventSubmit] = useState(false);
  const [submitData, setSubmitData] = useState({
    image: blogInfo.image,
    title: blogInfo.title,
    content: blogInfo.content,
  });
  useEffect(() => {
    if (blogInfo && blogInfo.image) {
      setPreviewImage(blogInfo.image);
    }
  }, [blogInfo.image]);
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
    mutationKey: ["updateBlog", blogId],
    mutationFn: (updateData) => {
      BlogService.updateBlogService(blogId, updateData);
    },
    onMutate: () => {
      setIsPreventSubmit(true);
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
        queryKey: ["update-blog"],
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
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
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
    try {
      await mutation.mutateAsync(submitData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggleUpdatePondModal = () => {
    dispatch(toggleUpdateBlogModal());
  };
  return (
    <div className="update-blog-container">
      <ToastContainer />
      <div className="update-blog-modal">
        <div className="update-blog-header">
          <strong>Update Blog</strong>
          <i className="bx bx-x" onClick={handleToggleUpdatePondModal}></i>
        </div>
        <form action="" onSubmit={handleSubmit} className="update-blog-form">
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
            <label htmlFor="title">Blog title</label>
            <input
              type="text"
              name="title"
              onChange={handleOnChange}
              defaultValue={submitData.title}
              placeholder="Enter blog title"
            />
          </div>
          <div className="input-item">
            <label htmlFor="blog-content">Blog Content</label>
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
              data={submitData.content || ""}
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
            <button onClick={handleToggleUpdatePondModal}>Cancel</button>
            <button>Update confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
