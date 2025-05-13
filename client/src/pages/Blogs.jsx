import React, { useEffect, useState} from 'react';
import { getBlogs, deleteBlog } from '../feature/blog.slice';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router';


const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blog.items);
  //console.log(blogs);
  useEffect(() => {
      dispatch(getBlogs());
   
  }, [dispatch]);
 // console.log("blogs", blogs);
  return (
    <div className='min-h-screen bg-gray-100'>
      <div>
        <h2 className='text-3xl text-center p-4'>Blogs</h2>
        <div className='bg-white flex flex-col gap-4 p-4'>
          {
            blogs.map(blog => (
             <div key={blog._id} className='w-full bg-gray-300 p-4 rounded-xl'>
              <NavLink to={`/blogPost/${blog._id}`} ><p className='text-xl'>{blog.title}</p></NavLink>
              <div dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 100) + "..." }} />
             <div className='w-full flex gap-4'>
              <button className='p-4 bg-white w-3/12 rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer' onClick={()=>handleUpdate(blog)}>Update</button>
              <button className='p-4 bg-white w-3/12 rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer' onClick={()=>(dispatch(deleteBlog(blog._id)))}>Delete</button>
             </div>
             </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Blogs
