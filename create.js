import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-libs";
import {success, failure} from "./libs/response-lib";

export async function main(event, context) {
    //Request body is passed in as a JSON enconded string in event.body
    const data = JSON.parse(event.body);
    const params = {
        TableName: "Notes",
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        console.log(e);
        return failure({status: false});
    }
}