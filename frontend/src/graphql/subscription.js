import gql from "graphql-tag";

export const SUBSCRIBE_TO_POST_CREATE = gql`
    subscription onCreatePost{
        onCreatePost{
            id,
            text,
            name,
            createTimestamp
        }
    }
`;
