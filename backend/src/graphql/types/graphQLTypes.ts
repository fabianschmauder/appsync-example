export interface Post {
    id: string;
    name: string;
    text: string;
    createTimestamp: number;
}

export interface CreatePostData {
    name: string;
    text: string;
}

export interface PostKey {
    id:string;
}

export interface PostListQueryOptions {
    limit?:number;
}