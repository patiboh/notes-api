import AWS from 'aws-sdk';

AWS.config.update({region: `${process.env.region}`});

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}
