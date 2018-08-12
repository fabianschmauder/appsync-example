import {DynamoDB} from "aws-sdk";
import * as dbLocal from "dynamodb-local";
import * as AWS from "aws-sdk";
const region = 'eu-central-1';
AWS.config.region = region;
const dynamoLocalPort = 8006;

const dyn = new DynamoDB({endpoint: 'http://localhost:' + dynamoLocalPort, region: region});

export const postTable = {
    AttributeDefinitions: [
        {
            AttributeName: 'id',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'id',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: 'post-test-table',
    StreamSpecification: {
        StreamEnabled: false
    }
};

export function setUpDbEnvironment() {
    console.log('setup DB environment');
//@ts-ignore
    process.env.DYNAMOLOCAL = true;
//@ts-ignore
    process.env.DYNAMOLOCALPORT = dynamoLocalPort;
//@ts-ignore
    process.env.POST_TABLE_NAME = postTable.TableName;
}

export function startDatabase():Promise<any> {
    setUpDbEnvironment();
    console.log('lunch local DB');
    return dbLocal.launch(dynamoLocalPort, null, ['-sharedDb'])

}

export function stopDb() {
    console.log('stop local DB');
    dbLocal.stop(dynamoLocalPort);
}

export function createTables():Promise<any>{
    console.log('create tables');
    return dyn.createTable(postTable).promise()
}

export function deleteTables():Promise<any> {
    console.log('delete tables');
    return dyn.deleteTable({TableName: postTable.TableName}).promise()
}