import React from 'react';

function timeString(time) {
    let date = new Date(time);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

export default function PostComponent(props) {
    const post = props.post;
    return (
        <div className="post">
            <div className="post-header">
                {timeString(post.createTimestamp * 1000) + " " + post.name}
            </div>
            <div className="post-content">
                {post.text}
            </div>
        </div>
    );
}