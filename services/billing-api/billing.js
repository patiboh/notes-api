import AWS from '../../libs/aws-sdk';
import stripePackage from 'stripe';

import config from '../../config';
import {calculateCost} from './libs/billing-lib';
import {success, failure} from '../../libs/response-lib';

const ssm = new AWS.SSM();

/* Decrypt parameter outside Lambda handler */
const stripeSecretKeyPromise = ssm
  .getParameter({
    Name: config.stripeKeyName,
    WithDecryption: true
  })
  .promise();

export async function main(event, context) {
  const {storage, source} = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = 'Scratch charge';

  const stripeSecretKey = await stripeSecretKeyPromise;
  const stripe = stripePackage(stripeSecretKey.Parameter.Value);

  try {
    await stripe.charges.create({
      source,
      amount,
      description,
      currency: 'eur'
    });
    return success({status: true});
  } catch (error) {
    return failure({message: error.message});
  }
}
