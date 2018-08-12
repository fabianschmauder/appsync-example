import React, {Component} from 'react';

import {compose} from 'react-apollo';
import {listPosts} from "./apollo/listPosts";
import {createPost} from "./apollo/createPost";
import PostForm from "./components/PostForm";
import PostComponent from "./components/PostComponent";
class App extends Component {
    componentDidMount() {
        this.props.subscribeToPosts();
    }

    render() {
        let posts = this.props.posts;
        return (
            <div className="App">
                {posts.map((post) => <PostComponent key={post.id} post={post}/>)}
                <PostForm onSendPost={(postData) => this.props.createPost(postData)}/>
            </div>
        );
    }
}

export default compose(listPosts, createPost)(App);
