import jsonServer from '../api/jsonServer';
import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_blogposts':
            return action.payload;
        case 'edit_blogpost':
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id 
                    ? action.payload 
                    : blogPost;
            });
        case 'delete_blogpost':
            return state.filter(blogPost => blogPost.id !== action.payload);
        default:
            return state;
    }
};

const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts');
        dispatch({type: 'get_blogposts', payload: response.data})
    }
}

const addBlogPost = dispatch => {
    // return (title, content, callback) => {
    //     dispatch({ type: 'add_blogpost', payload: { title: title, content: content } });
    //     callback ? callback() : null;
    // };
    return async (title, content, callback) => {
        await jsonServer.post('/blogposts', { title: title, content: content });
        if (callback) {
            callback()
        } else {
            null
        }
    };
};

const deleteBlogPost = dispatch => {
    // return id => {
    //     dispatch({ type: 'delete_blogpost', payload: id  });
    // };
    return async id => {
        await jsonServer.delete(`/blogposts/${id}`);
        dispatch({ type: 'delete_blogpost', payload: id  });
    };
};

const editBlogPost = dispatch => {
    // return (id, title, content, callback) => {
    //     dispatch({
    //         type: 'edit_blogpost', 
    //         payload: { id: id, title: title, content: content }
    //     });
    //     callback ? callback() : null;
    // };
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, { title: title, content: content });
        
        dispatch({
            type: 'edit_blogpost', 
            payload: { id: id, title: title, content: content }
        });
        callback ? callback() : null;
    };
};


export const { Context, Provider } = createDataContext(
    blogReducer, 
    { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
    []
);