import AWS from '../../libs/aws-sdk';
import config from '../../config';
import {success, failure} from '../../libs/response-lib';

AWS.config.update({
  region: process.env.region
});
const ssm = new AWS.SSM();

/* Decrypt parameter outside Lambda handler */
const adminPhoneNumberPromise = ssm
  .getParameter({
    Name: config.adminPhoneNumber,
    WithDecryption: true
  })
  .promise();

export async function main(event, context) {
  // Parse SNS data
  const {amount, description} = JSON.parse(event.Records[0].Sns.Message);
  const adminPhoneNumber = await adminPhoneNumberPromise;
  const params = {
    Message: `Charged ${amount} for ${description}`,
    PhoneNumber: adminPhoneNumber.Parameter.Value
  };
  const sns = new AWS.SNS();
  try {
    sns.publish(params);

    return success({status: true});
  } catch (error) {
    return failure({message: error.message});
  }
}
