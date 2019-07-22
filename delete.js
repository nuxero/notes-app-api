import * as dynamoDbLib from "./libs/dynamodb-libs";
import {success, failure} from "./libs/response-lib";

export async function main(event, context) {
    const params = {
        TableName: "Notes",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    try {
        await dynamoDbLib.call("delete", params);
        return success({status: true});
    } catch (e) {
        console.log(e);
        return failure({status: false});
    }
}