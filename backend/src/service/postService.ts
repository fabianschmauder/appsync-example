import {generateUuid} from "../util";
import {getItem, putItem, scan} from "../db/dbAccess";
import {env} from "../env/env";
import {getPostItemQuery, getScanPostQuery} from "../db/post/query";
import {CreatePostData, Post, PostKey, PostListQueryOptions} from "../graphql/types/graphQLTypes";

export const createPost = function (createPostData: CreatePostData): Promise<Post> {
    const postResponse: Post = {
        id: generateUuid(),
        name: createPostData.name,
        text: createPostData.text,
        createTimestamp: Math.round(new Date().getTime()/1000)
    };
    return putItem(env().POST_TABLE_NAME,postResponse).then(() => postResponse);
};

export const getPost = function (postKey: PostKey) : Promise<Post>{
    return getItem(getPostItemQuery(postKey))
        .then((data) => data.Item)
};
function compare(a:Post, b:Post) {
    if (a.createTimestamp < b.createTimestamp)
        return -1;
    if (a.createTimestamp > b.createTimestamp)
        return 1;
    return 0;
}

export const listPosts = function (queryOptions : PostListQueryOptions) :Promise<Post[]> {
    return scan(getScanPostQuery(queryOptions)).then((posts:Post[]) => posts.sort(compare));
};