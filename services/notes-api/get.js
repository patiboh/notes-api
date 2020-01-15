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
     * 'Key' defines the partition key and sort key of the item to be retrived
     * - 'userId': Cognito Identity Pool identity of authenticated user
     * - 'noteId': note path parameter
     */
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  dynamoDb.get(params, (error, data) => {
    console.log('CALLBACK dynamoDb.get', data);
    if (error) {
      callback(failure({status: false}), null);
      return;
    }
    console.log('SUCESS dynamoDb.get', data);
    if (data.Item) {
      // Return the retrieved item
      console.log('Success ');

      callback(null, success(data.Item));
      return;
    } else {
      callback(failure({status: false, error: 'Item not found'}), null);
    }
  });
}
