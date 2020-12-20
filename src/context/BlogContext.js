import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'edit_blogpost':
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id 
                    ? action.payload 
                    : blogPost;
            });
        case 'delete_blogpost':
            return state.filter(blogPost => blogPost.id !== action.payload);
        case 'add_blogpost':
            return [
                ...state, 
                { 
                    id: Math.floor(Math.random() * 99999), 
                    title: action.payload.title,
                    content: action.payload.content
                }
            ];
        default:
            return state;
    }
};

const addBlogPost = dispatch => {
    return (title, content, callback) => {
        dispatch({ type: 'add_blogpost', payload: { title: title, content: content } });
        callback();
    };
};

const deleteBlogPost = dispatch => {
    return id => {
        dispatch({ type: 'delete_blogpost', payload: id  });
    };
};

const editBlogPost = dispatch => {
    return (id, title, content) => {
        dispatch({
            type: 'edit_blogpost', 
            payload: { id: id, title: title, content: content }
        });
    };
};


export const { Context, Provider } = createDataContext(
    blogReducer, 
    { addBlogPost, deleteBlogPost, editBlogPost },
    // []
    [{ title: 'Test Post', content: 'This is a test post', id: 1 }]
);




// const BlogContext = React.createContext();

// export const BlogProvider = ({ children }) => {
//     const [blogPosts, dispatch] = useReducer(blogReducer, []);
//     const addBlogPost = () => {
//         dispatch({ type: 'add_blogpost'});
//     };
//     return (
//         <BlogContext.Provider value={{ data: blogPosts, addBlogPost }}>{children}</BlogContext.Provider>
//     );
// };

// export default BlogContext;



// const addBlogPost = () => {
//     setBlogPosts([...blogPosts, { title: `Blog Post #${blogPosts.length + 1}`},])
// };

// return (
//     <BlogContext.Provider value={{ data: blogPosts, addBlogPost }}>{children}</BlogContext.Provider>
// );