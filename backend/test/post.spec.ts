import {describe, before, beforeEach, it, after} from 'mocha';
import * as chai from 'chai';

import {field, graphQL} from '../src/graphql/endpoint/graphQLEndpoint';
import {CreatePostData, Post} from "../src/graphql/types/graphQLTypes";
import {createTables, deleteTables, startDatabase, stopDb} from "./dbTestUtils";
import {Context} from "aws-lambda";


const expect = chai.expect;

let setUpEnvironment = function () {
    console.log("setup environment dev");
    //@ts-ignore
    process.env.STAGE = 'dev';
};


describe("event", function() {
    this.timeout(25000);
    before(function (done) {
        setUpEnvironment();
        stopDb();
        startDatabase().then(() => done()).catch((err) => done(err));

    });

    beforeEach(function (done) {
        createTables().then(() => done()).catch((err) => done(err));
    });

    describe("create post", () => {
        it("should save an post to the database", (done) => {

            const createEventData:CreatePostData = {
                name: 'user name',
                text: 'Hello!'
            };
            callEndPoint(field.CREATE_POST, createEventData).then((result:Post) => {
                expect(result.id).not.be.null;
                expect(result.name).be.eq("user name");
                expect(result.text).be.eq("Hello!");
                expect(result.createTimestamp).not.be.null;
                done();
            }).catch((error) => done(error))
        });
    });


    describe("get", () => {
        it("should retrieve a saved Event", (done) => {
            const createEventData:CreatePostData = {
                name: 'user name',
                text: 'Hello!'
            };
            callEndPoint(field.CREATE_POST, createEventData).then((savedEvent: Post) => {
                return callEndPoint(field.GET_POST, {id: savedEvent.id}).then((getEventResponse:Post) => {
                    expect(getEventResponse.id).not.be.null;
                    expect(getEventResponse.id).not.be.null;
                    expect(getEventResponse.name).be.eq("user name");
                    expect(getEventResponse.text).be.eq("Hello!");
                    expect(getEventResponse.createTimestamp).not.be.null;
                    done();

                })
            }).catch((error) => done(error))

        });
    });

    describe("list", () => {
        it("should list all saved Events", (done) => {
            const firstEventData:CreatePostData = {
                name: 'user name',
                text: 'Hello!'
            };

            const secondEventData:CreatePostData = {
                name: 'user2 name',
                text: 'Hello! How are you?'
            };
            //@ts-ignore
            Promise.all([
                callEndPoint(field.CREATE_POST, firstEventData),
                callEndPoint(field.CREATE_POST, secondEventData)]).then(() => {
                return callEndPoint(field.LIST_POSTS, {limit:20}).then((listResponse:Post[]) => {
                    expect(listResponse.length).be.eq(2);
                    expect(listResponse[0].id).not.be.null;
                    expect(listResponse[0].name).be.eq("user name");
                    expect(listResponse[0].text).be.eq("Hello!");
                    expect(listResponse[0].createTimestamp).not.be.null;

                    expect(listResponse[1].id).not.be.null;
                    expect(listResponse[1].name).be.eq("user2 name");
                    expect(listResponse[1].text).be.eq("Hello! How are you?");
                    expect(listResponse[1].createTimestamp).not.be.null;
                    done();

                })
            }).catch((error) => done(error))

        });
    });

    afterEach(function (done) {
        deleteTables().then(()=>done()).catch(done)
    });

    after(function () {
        stopDb();
    });
});


function callEndPoint(field: string, queryArguments: any): Promise<any> {
    //@ts-ignore
    return new Promise(function (fulfill, reject) {
        graphQL({
            field: field,
            arguments: queryArguments
        }, getContext(), (error: Error, result: any) => {
            if (error) {
                reject(error);
            } else {
                fulfill(result)
            }

        });
    });
}

function getContext(): Context {
    return {
        callbackWaitsForEmptyEventLoop: false,
        functionName: '',
        functionVersion: '',
        invokedFunctionArn: '',
        memoryLimitInMB: 0,
        awsRequestId: '',
        logGroupName: '',
        logStreamName: '',
        getRemainingTimeInMillis: () => 0,
        done:(error, result)=> {},
        fail:(error:string|Error)=> {},
        succeed:(messageOrObject:any)=> {}
    };
}