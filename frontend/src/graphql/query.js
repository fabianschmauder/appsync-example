import gql from "graphql-tag";

export const LIST_POSTS = gql`
    query {
        listPosts(limit:20){
            id,
            name,
            text,
            createTimestamp
        }
    }
`;
