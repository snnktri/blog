import React, {useEffect, useState, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { getBlogById } from "../apiHandler/blog"
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { updateBlog } from '../feature/blog.slice';
import { imageUploader } from "../apiHandler/imageApi";


const BlogPost = () => {
  const dispatch = useDispatch()
    const [imageUrl, setImageUrl] = useState("");
    const {id} = useParams();
    const [blog, setBlog] = useState({
      title: "",
      content: "",
      _id: "",
      author: "",
      image:""
    });
    const [isEditable, setIsEditable] = useState(false);
    const editorRef = useRef(null);


    useEffect(() => {

        const getBlog = async (id) => {
            const response = await getBlogById(id);
            const {title, content, _id, author} = response.data;
            setBlog({
              title,
              content,
              _id,
              author
            })
        }

        if(id) getBlog(id);
    }, [id]);

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

    const handleUpdate = () => {
      console.log("I am function")
      let updateContent;
      if(editorRef.current) {
        updateContent = editorRef.current.getContent();
      }
      console.log("content:", updateContent);
      console.log(imageUrl)
      console.log(blog.title);
      const updatedBlog = {
        title: blog.title,
        content: updateContent,
        image: imageUrl,
        _id: blog._id,
        author: blog.author
      };
      console.log("update Blog is",updatedBlog);
      dispatch(updateBlog(updatedBlog));
      setIsEditable(false);
    }



  return (
    <div className='w-full'>
      <div className='w-full'>
        {
            (blog.author !=="" && isEditable)? (
               <div className="flex flex-col p-4">
                     <input type="text" value={blog.title} onChange={(e) => setBlog(prev => ({ ...prev, title: e.target.value }))} placeholder="Title" className="p-4 bg-gray-300 m-4 w-[50%] rounded-xl mx-auto"/>
                     <Editor
                       apiKey="wlv0brmc42eua1cpu6od0ll1ieplkrhmjl5tbaqlvlvg4iv0"
                       initialValue={blog.content}
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
                      <button onClick={handleUpdate}
                     className="cursor-pointer p-4 bg-blue-500 hover:bg-blue-700 m-4 mx-auto w-[50%] md:w-[30%] rounded-xl text-xl uppercase text-white">
                       Save Post
                     </button>
                     </div>
            ):
            (
                <div className='w-full flex flex-col p-4'>
                    <p className='text-xl text-center capitalize font-semibold'>{blog.title}</p>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    <button className="cursor-pointer p-4 bg-blue-500 hover:bg-blue-700 m-4 w-[50%] md:w-[30%] rounded-xl text-xl uppercase text-white mx-auto"
        onClick={()=>setIsEditable(prev=>!prev)}>update</button>
                </div>
            )
        }
       
      </div>
    </div>
  )
}

export default BlogPost;
// () => {
//   // setIsEditable(false);
//   //  const updatedContent = editorRef.current.getContent();
//   //  console.log(updatedContent);
//   //  console.log(blog.title);
//   //  dispatch(updateBlog(blog));
//   handleUpdate();
//                         }
