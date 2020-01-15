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
     * 'KeyConditionExpression' defines the condition for the query
     * - 'userId = :userId': only return items with matching 'userId' partition key
     * 'ExpressionAttributeValues' defines the value in the condition
     * - ':userId' defines 'userId' to be Identoty Pool id of the authenticated user
     */

    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId
    }
  };
  dynamoDb.query(params, (error, data) => {
    if (error) {
      callback(failure({status: false}), null);
      return;
    }

    callback(null, success(data.Items));
  });
}
