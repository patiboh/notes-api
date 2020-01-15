const stage = process.env.stage;
const resourcesStage = process.env.resourcesStage;

const stageConfigs = {
  dev: {
    stripeKeyName: '/stripeSecretKey/test'
  },
  prod: {
    stripeKeyName: '/stripeSecretKey/live'
  }
};

const config = stageConfigs[stage] || stageConfigs.dev;

export default {
  stage,
  resourcesStage,
  ...config
};
