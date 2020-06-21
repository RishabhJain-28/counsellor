import {
    LOAD_BLOGS,
    READ_BLOG
} from '../actions/types';

const initialState = {
    blogLoading: true,
    blogs:[],
    readBlog: null
};

export default ( state = initialState, action ) => {
    switch(action.type){
        
        // load blogs
        case LOAD_BLOGS:
            return{
                ...state,
                blogs: action.payload,
                blogLoading: false
            };

        // read blog
        case READ_BLOG:
            return{
                ...state,
                readBlog: action.payload
            };

        default:
            return state;
    }
} 