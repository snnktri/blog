import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../utils/axiosInstance";


const initialState = {
   items: [],
   loading: false,
   error: null
}

export const getBlogs = createAsyncThunk(
    "blog/getBlogs", async() => {
   try {
    const tok = localStorage.getItem("token");
     const response = await api.get("/blogs/getAllBlogs", {
         headers: {
             Authorization: `Bearer ${tok}`
         }
     });
         console.log(response);
         return response.data;
   } catch (error) {
    console.log("error")
   }
    }
)

export const updateBlog = createAsyncThunk(
    "blog/updateBlogs", async(updatedBlog)=> {
        const tok = localStorage.getItem('token');
        console.log(updatedBlog)
        const response = await api.put(`/blogs/updateBlog/${updatedBlog._id}`, updatedBlog, {
            headers: {
                Authorization: `Bearer ${tok}`
            }
        });
        console.log(response.data.data);
        return response.data;
    }
)

export const addBlog = createAsyncThunk(
    "blog/addBlog", async(blog) => {
        const tok = localStorage.getItem('token');
        const response = await api.post("/blogs/createBlog", blog, 
            {
                headers: {
                    Authorization: `Bearer ${tok}`
                }
            }
        );
        console.log(response);
        return response.data;
    }
);

export const deleteBlog = createAsyncThunk(
    "blog/deleteBlog", async(id)=>{
        const tok = localStorage.getItem('token');
        const response = await api.delete(`/blogs/deleteBlog/${id}`, {
            headers: {
                Authorization: `Bearer ${tok}`
            }
        });
        return id;
    }
)



const blogSlice = createSlice(
    {
        name: "blog",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(addBlog.pending, (state) => {
                    state.loading = true;
                })
                .addCase(addBlog.fulfilled, (state, action) => {
                    state.loading = false;
                    console.log(action.payload.data)
                    const { title, content, _id } = action.payload.data;
                    state.items.push({
                        title,
                        content,
                        _id
                    })
                })
                .addCase(addBlog.rejected, (state)=> {
                    state.loading= false;
                })
                .addCase(updateBlog.pending, (state) => {
                    state.loading= true;
                })
                .addCase(updateBlog.fulfilled, (state, payload) => {
                    state.loading=false;
                    state.items = state.items.map(blog => blog.id === action.payload.id ? action.payload : blog )
                })
                .addCase(deleteBlog.pending, state => {state.loading = true})
                .addCase(deleteBlog.fulfilled, (state, action) => {
                    state.loading = false;
                    console.log(action.payload);
                    state.items = state.items.filter(blog => blog._id !== action.payload)
                    console.log(state.items);
                })
                .addCase(getBlogs.pending, state=> {state.loading = true})
                .addCase(getBlogs.fulfilled, (state, action) => {
                    state.loading = false;
                   // console.log(action.payload.data)
                    const items = Array.isArray(action.payload.data)? action.payload.data : [];

                    state.items = items.map(blog =>
                    ({
                        title: blog.title,
                        content: blog.content,
                        _id: blog._id
                    })
                    )
                   // console.log("irems: ", items)
                });
        }
    }
)

export default blogSlice.reducer;