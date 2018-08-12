import {CREATE_POST} from "../graphql/mutation";
import {LIST_POSTS} from "../graphql/query";
import {graphql} from "react-apollo/index";

const postNotAdded = (newPost, posts)  => {
    return newPost && newPost.id && posts.filter((post) => post.id === createPost.id).length === 0;
};

const updateInternalState = (proxy,{data:{createPost}})=> {
    const data = proxy.readQuery({query:LIST_POSTS});
    if( postNotAdded(createPost, data.listPosts) ){
        data.listPosts.push(createPost);
    }
    proxy.writeQuery({query:LIST_POSTS,data})
};

const expectedResponse =  (post)  => ({
        __typename: 'Mutation',
        createPost: {
            ...post,
            id:'tempId'+ Math.round(new Date().getTime()/1000),
            createTimestamp: Math.round(new Date().getTime()/1000),
            __typename: 'Post'
        }
});

export const createPost = graphql(CREATE_POST, {
    props: props => ({
        createPost: post => props.mutate({
            variables: post,
            optimisticResponse:expectedResponse(post),
            update:updateInternalState
        })
    })
});

