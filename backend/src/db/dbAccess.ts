import {config, DynamoDB} from "aws-sdk";
import {ClientConfiguration} from "aws-sdk/clients/dynamodb";
import {env} from "../env/env";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import PutItemOutput = DocumentClient.PutItemOutput;
import ScanInput = DocumentClient.ScanInput;
import GetItemInput = DocumentClient.GetItemInput;

function dynamoClient() {
    const dynamoProperties:ClientConfiguration = {region: config.region, apiVersion: '2012-08-10'};
    if(env().DYNAMOLOCAL){
        dynamoProperties.endpoint =  'http://localhost:'+env().DYNAMOLOCALPORT;
    }
    return new DynamoDB.DocumentClient(dynamoProperties);
}


export function putItem(tableName: string, item:any) :Promise<PutItemOutput> {
    const dbClient= dynamoClient();
    return dbClient.put({
        TableName: tableName,
        Item: item
    }).promise();
}

export function getItem(getQuery:GetItemInput) :Promise<any> {
    const dbClient= dynamoClient();
    return dbClient.get(getQuery).promise();
}

export function scan(scanInput:ScanInput) :Promise<any> {
    const dbClient= dynamoClient();
    return dbClient.scan(scanInput).promise().then((data) => data.Items);
}