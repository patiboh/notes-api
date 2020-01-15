// import * as dynamoDbLib from '../../libs/dynamodb-lib';
import {success, failure} from '../../libs/response-lib';
import AWS from 'aws-sdk';
AWS.config.update({
  region: process.env.region
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function main(event, context, callback) {
  const params = {
    TableName: process.env.tableName,

    /**
     * 'Key' defines the partition key and sort key of the items to be updated
     * - 'userdId': Identity Pool identity id of the authenticated user
     * - 'noteId': path parameter
     */
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };
  dynamoDb.delete(params, (error, data) => {
    if (error) {
      callback(failure({status: false}), null);
      return;
    }

    callback(null, success({status: true}));
  });
}
