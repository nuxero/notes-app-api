import * as dynamoDbLib from './libs/dynamodb-libs';
import {success, failure} from './libs/response-lib';

export async function main(event, context) {
    const params = {
        TableName: "Notes",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    try {
        const result = await dynamoDbLib.call("get", params);
        if(result.Item) {
            return success(result.Item);
        } else {
            return failure({status: false, error: "Item not found"});
        }
    } catch(e) {
        console.log(e);
        return failure({status: false});
    }
}