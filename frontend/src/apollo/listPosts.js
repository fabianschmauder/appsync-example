import {LIST_POSTS} from "../graphql/query";
import {graphql} from "react-apollo/index";
import {SUBSCRIBE_TO_POST_CREATE} from "../graphql/subscription";

const listContainsPost = (posts, postToSearch) => posts.filter((post) => post.id === postToSearch.id).length > 0;

const stateUpdate = (prevState, {subscriptionData: {data: {onCreatePost}}}) => {
    if(listContainsPost(prevState.listPosts, onCreatePost)){
        return prevState;
    }
    return ({...prevState, listPosts: [...prevState.listPosts, onCreatePost]})
};

const subscriptionToCreate = (props) => {
    props.data.subscribeToMore({
        document: SUBSCRIBE_TO_POST_CREATE,
        updateQuery:stateUpdate
    })
};

export const listPosts = graphql(LIST_POSTS, {
    options: {
        fetchPolicy: 'cache-and-network'
    },
    props: props => ({
        posts: props.data.listPosts ? props.data.listPosts : [],
        subscribeToPosts:() => subscriptionToCreate(props)
    })
});
