// import React, { useRef, useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";
// import { imageUploader } from "../apiHandler.js/imageApi";

// const TextEditor = () => {
//   const editorRef = useRef(null); // Reference to the editor instance
//   const [isEditorReady, setIsEditorReady] = useState(false); // State to track editor readiness
//   const [uploadStatus, setUploadStatus] = useState(""); // State to track image upload status

//   // Image upload handler
//   const handleImageUpload = async (blobInfo, success, failure) => {
//     const formData = new FormData();
//     formData.append("image", blobInfo.blob(), blobInfo.filename());
  
//     try {
//       const response = await imageUploader(formData);
  
//       // Log the API response for debugging
//       console.log("API Response:", response);
  
//       // Check if the response contains the expected imageUrl
//       if (response.success && response.data?.imageUrl) {
//         const uploadedImageUrl = response.data.imageUrl;
//         success(uploadedImageUrl); // Notify TinyMCE of the successful upload
//         setUploadStatus("Image uploaded successfully!");
  
//         // Insert the image into the editor content
//         if (editorRef.current) {
//           editorRef.current.insertContent(
//             `<img src="${uploadedImageUrl}" alt="uploaded" height="300" width="300"/>`
//           );
//         } else {
//           console.error("Editor instance is not available.");
//         }
//       } else {
//         failure("Image upload failed: No image URL returned.");
//         setUploadStatus("Image upload failed: No image URL returned.");
//       }
//     } catch (error) {
//       console.error("Error during image upload:", error);
//       failure("Image upload failed: " + error.message);
//       setUploadStatus("Image upload failed: " + error.message);
//     }
//   };

//   const onEditorInit = (evt, editor) => {
//     editorRef.current = editor;
//     setIsEditorReady(true);
//   };

//   return (
//     <div>
//       <Editor
//         apiKey="wlv0brmc42eua1cpu6od0ll1ieplkrhmjl5tbaqlvlvg4iv0"
//         initialValue="Write something...."
//         onInit={onEditorInit}
//         init={{
//           height: 500,
//           plugins: [
//             "advlist",
//             "autolink",
//             "lists",
//             "link",
//             "image",
//             "charmap",
//             "preview",
//             "anchor",
//             "searchreplace",
//             "visualblocks",
//             "code",
//             "fullscreen",
//             "insertdatetime",
//             "media",
//             "table",
//             "code",
//             "help",
//             "wordcount",
//           ],
//           toolbar:
//             "undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
//           automatic_uploads: true,
//           images_reuse_filename: true,
//           images_upload_handler: handleImageUpload,
//         }}
//       />
//       {/* Display editor readiness and upload status */}
//       {isEditorReady ? (
//         <p>Editor is ready</p>
//       ) : (
//         <p>Waiting for editor to initialize...</p>
//       )}
//       {uploadStatus && <p>{uploadStatus}</p>}
//     </div>
//   );
// };

// export default TextEditor;

import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { imageUploader } from "../apiHandler/imageApi";
import BlogPost from "./BlogPost";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addBlog } from "../feature/blog.slice"

const TextEditor = () => {
  const editorRef = useRef(null); // Reference to the editor instance
  //const [uploadStatus, setUploadStatus] = useState(""); // State to track image upload status
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();



  // Image upload handler
  const handleImageUpload = async (blobInfo, success, failure) => {
    const formData = new FormData();
    formData.append("image", blobInfo.blob(), blobInfo.filename());

    try {
      const response = await imageUploader(formData);
      
      if (response.success && response.data?.imageUrl) {
        const uploadedImageUrl = response.data.imageUrl;
        success(uploadedImageUrl); // Notify TinyMCE of the successful upload
        setImageUrl(uploadedImageUrl);
      //  setUploadStatus("Image uploaded successfully!");

        // Insert the image into the editor content
        if (editorRef.current) {
          editorRef.current.insertContent(
            `<img src="${uploadedImageUrl}" alt="uploaded" height="300" width="300"/>`
          );
        }
      } else {
        throw new Error("Image upload failed: No image URL returned.");
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      failure("Image upload failed: " + error.message);
      setUploadStatus("Image upload failed: " + error.message);
    }
  };

  const handleClick = () => {
    let content;
   if(editorRef.current) {
    content = editorRef.current.getContent();
    console.log("Content is: ", content)
   }
   else {
     console.log("Editor not available")
 
   }
   const blog = {
    title,
    content,
    image: imageUrl
   }

   try {
    dispatch(addBlog(blog));
    console.log("Response: ", response.data.content);
    
   } catch (error) {
    console.log("Error on submitting blog.:", error.message);
    
   }
  // console.log("blog: ", blog)
  }



  return (
    <div className="min-h-screen w-full bg-gray-200">
      <h2 className="text-3xl text-center capitalize font-bold">Post Blogs</h2>
      <div className="flex flex-col p-4">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="p-4 bg-gray-300 m-4 w-[50%] rounded-xl mx-auto"/>
      <Editor
        apiKey="wlv0brmc42eua1cpu6od0ll1ieplkrhmjl5tbaqlvlvg4iv0"
        initialValue="Write something...."
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          height: 500,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
          automatic_uploads: true,
          images_reuse_filename: true,
          images_upload_handler: handleImageUpload,
        }}
      />
       <button onClick={handleClick}
      className="cursor-pointer p-4 bg-blue-500 hover:bg-blue-700 m-4 mx-auto w-[50%] md:w-[30%] rounded-xl text-xl uppercase text-white">
        post Blog
      </button>
      </div>
     
      <div>

      </div>
      
    </div>
  );
};

export default TextEditor;
