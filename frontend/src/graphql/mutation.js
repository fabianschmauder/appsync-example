import gql from "graphql-tag";

export const CREATE_POST = gql`
    mutation createPost($name:String!,$text:String!){
        createPost(name:$name,text:$text){
            id,
            text,
            name,
            createTimestamp
        }
    }
`;