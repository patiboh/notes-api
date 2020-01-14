// import * as dynamoDbLib from '../../libs/dynamodb-lib';
// import {success, failure} from '../../libs/response-lib';
import AWS from 'aws-sdk';
AWS.config.apiVersions = {
  dynamodb: '2012-08-10'
  // other service API versions
};
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
  // dynamoDb.query(params, (error, data) => {
  //   // Set response headers to enable CORS (Cross-Origin Resource Sharing)
  //   const headers = {
  //     'Access-Control-Allow-Origin': 'https://dev.notes.fat-fuzzy.rocks',
  //     'Access-Control-Allow-Credentials': 'true'
  //   };
  //   if (error) {
  //     const response = {
  //       statusCode: 500,
  //       headers: headers,
  //       body: JSON.stringify({status: false})
  //     };
  //     callback(null, response);
  //     return;
  //   }

  //   // Return status code 200 and the newly created item
  //   const response = {
  //     statusCode: 200,
  //     headers: headers,
  //     body: JSON.stringify(data.Items)
  //   };
  //   callback(null, response);
  // });
  // try {
  //   const result =

  //   // Return the matching list of items in response body

  //   console.log('Result', result);
  //   return success(result.Count);
  // } catch (error) {
  //   return failure({status: false});
  // }

  dynamoDb.query(params, (error, data) => {
    // if (error) {
    //   console.log('Error', error);
    //   callback(error, null);
    // } else {
    //   console.log('Success', data.Items);
    //   callback(null, data.Items);
    // }
    const headers = {
      'Access-Control-Allow-Origin': 'https://dev.notes.fat-fuzzy.rocks',
      'Access-Control-Allow-Credentials': 'true'
    };
    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({status: false})
      };
      callback(null, response);
      return;
    }

    // Return status code 200 and the newly created item
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(data.Items)
    };
    callback(null, response);

    // // Set response headers to enable CORS (Cross-Origin Resource Sharing)
    // const headers = {
    //   'Access-Control-Allow-Origin': 'https://dev.notes.fat-fuzzy.rocks',
    //   'Access-Control-Allow-Credentials': 'true'
    // };
    // if (error) {
    //   const response = {
    //     statusCode: 500,
    //     headers: headers,
    //     body: JSON.stringify({status: false})
    //   };
    //   callback(null, response);
    //   return;
    // }

    // // Return status code 200 and the newly created item
    // const response = {
    //   statusCode: 200,
    //   headers: headers,
    //   body: JSON.stringify(data.Items)
    // };
    // callback(null, response);
  });
}
