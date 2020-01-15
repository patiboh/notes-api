const stage = process.env.stage;
const resourcesStage = process.env.resourcesStage;

const stageConfigs = {
  dev: {
    stripeKeyName: '/stripeSecretKey/test',
    adminPhone: '/adminPhone/test'
  },
  prod: {
    stripeKeyName: '/stripeSecretKey/live',
    adminPhone: '/adminPhone/live'
  }
};

const config = stageConfigs[stage] || stageConfigs.dev;

export default {
  stage,
  resourcesStage,
  ...config
};
