import {env} from "../../env/env";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import GetItemInput = DocumentClient.GetItemInput;
import {PostKey, PostListQueryOptions} from "../../graphql/types/graphQLTypes";
import ScanInput = DocumentClient.ScanInput;

let postKey =  (key:PostKey) => {
    return {
        "id": key.id
    };
};


export function getPostItemQuery (key:PostKey): GetItemInput {
    return {
        TableName: env().POST_TABLE_NAME,
        Key: postKey(key)
    }
}

export function getScanPostQuery (postListQueryOptions:PostListQueryOptions): ScanInput {
    return {
        TableName: env().POST_TABLE_NAME,
        Limit: postListQueryOptions.limit ? postListQueryOptions.limit: 50
    }
}