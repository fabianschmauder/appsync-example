import {Callback} from "aws-lambda";

export function resolve(promise:Promise<any>,callback:Callback) {
    promise.then((response) => callback(null,response)).catch((err) => callback(err,null))
}