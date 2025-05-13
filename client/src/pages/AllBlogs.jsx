import React, { useEffect, useState } from 'react';
import { getAllBlog } from '../apiHandler/blog';
import { NavLink } from 'react-router';

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const blogPerPage = 6;

    const totalPage = Math.ceil(blogs.length / blogPerPage);

    const index = (currentPage - 1)*blogPerPage;

    const currentBlogs = blogs.slice(index, index + blogPerPage);

    useEffect(() => {
       const getAll = async() => {
            const res = await getAllBlog();
           // console.log(res);
            setBlogs(res.data);
        }
        getAll();
    }, []);

    const nextPage = () => {
      if(currentPage < totalPage) setCurrentPage(prev => prev +1);
    };

    const prevPage =() => {
      if(currentPage > 1) setCurrentPage(prev => prev-1);
    }

    console.log(blogs);
  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <div>
        <h2 className='text-3xl text-center p-4'>Blogs</h2>
        <div className='bg-white flex flex-col gap-4 p-4'>
          {
            currentBlogs.map(blog => (
             <div key={blog._id} className='w-full bg-gray-300 p-4 rounded-xl'>
              <NavLink to={`/blogPost/${blog._id}`} ><p className='text-xl'>{blog.title}</p></NavLink>
              <div dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 100) + "..." }} />
             <div className='w-full flex gap-4'>
              {/* <button className='p-4 bg-white w-3/12 rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer' onClick={()=>handleUpdate(blog)}>Update</button>
             <button className='p-4 bg-white w-3/12 rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer' onClick={()=>(dispatch(deleteBlog(blog._id)))}>Delete</button> */}
             </div>
             </div>
            ))
          }
        </div>
        {/* next prev button */}
        <div className='flex justify-center gap-4 bg-white'>
          <div className=''>
            <button
            onClick={prevPage}
             disabled={currentPage===1}
             className={`p-4 text-center text-xl ${currentPage===1 ? "bg-gray-300":"bg-blue-500"} rounded-xl text-black cursor-pointer hover:scale-105`}
             >Previous</button>
          </div>
          <div className=''>
            <button
            onClick={nextPage}
            disabled={currentPage===totalPage}
            className={`p-4 px-8 text-center text-xl ${currentPage===totalPage ? "bg-gray-300":"bg-blue-500"} rounded-xl text-black cursor-pointer hover:scale-105`}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllBlogs
