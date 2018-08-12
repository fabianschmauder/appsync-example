import { Handler, Context, Callback } from 'aws-lambda';
import {resolve} from "./ResponseUtil";
import {createPost, getPost,listPosts} from "../../service/postService";

export const field = {
    CREATE_POST:'createPost',
    GET_POST:'getPost',
    LIST_POSTS:'listPosts'
};

function resolveField(event:any): Promise<any>{
    switch (event.field){
        case field.CREATE_POST:
            return createPost(event.arguments);
        case field.GET_POST:
            return getPost(event.arguments);
        case field.LIST_POSTS:
            return listPosts(event.arguments);
    }
    throw new Error("Field "+event.field+" Not found")
}

const graphQL: Handler = (event: any, context: Context, callback: Callback) => {
    resolve(resolveField(event),callback);
};

export { graphQL }