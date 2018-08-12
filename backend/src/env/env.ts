export interface Environment {
    STAGE:string,
    DYNAMOLOCAL:string,
    DYNAMOLOCALPORT:string,
    //tables
    POST_TABLE_NAME:string
}

export const env = function():Environment {
    //@ts-ignore process to access the env
    return process.env;
};
