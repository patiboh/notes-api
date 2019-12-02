/**
 * Shared AWS configuration accross services
 * Import in Lambda functins instead of standard aws-sdk
 * -> import AWS from '../../libs/aws-sdk';
 */

import aws from 'aws-sdk';
import xray from 'aws-xray-sdk';

/* Do not enable tracking for 'invoke local' */
const awsWrapped = process.env.IS_LOCAL ? aws : xray.captureAWS(aws);

export default awsWrapped;
