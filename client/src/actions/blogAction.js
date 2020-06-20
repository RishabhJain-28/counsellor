import axios from 'axios';

import{
    LOAD_BLOGS,
    READ_BLOG
} from './types';

// laod blogs
export const loadBlogs = () => async dispatch => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    dispatch({
        type: LOAD_BLOGS,
        payload: res.data
    });
};

// read blog
export const readBlog = (id) => async dispatch => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    dispatch({
        type: READ_BLOG,
        payload: res.data
    })
}; 