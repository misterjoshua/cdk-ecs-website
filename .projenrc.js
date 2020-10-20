const { AwsCdkConstructLibrary, Semver } = require('projen');

const project = new AwsCdkConstructLibrary({
  authorAddress: "joshkellendonk@gmail.com",
  authorName: "Josh Kellendonk",
  license: "MIT",
  jsiiVersion: Semver.caret('1.13.0'),
  cdkVersion: "1.68.0",
  name: "@wheatstalk/cdk-ecs-website",
  repository: "git@github.com:wheatstalk/cdk-ecs-website.git",
  releaseBranches: ['release'],
  gitignore: [
    ".idea",
    "*.iml",
    "cdk.out.*",
  ],
  devDependencies: {
    "ts-node": "^9.0.0",
    "@types/fs-extra": "^8.1.0",
  },
  bundledDependencies: [
    "@aws-cdk-containers/ecs-service-extensions",
    "fs-extra",
  ],
  dependencies: {
    "fs-extra": "^8.1.0",
    "@aws-cdk-containers/ecs-service-extensions": "^1.68.0",
  },
  cdkTestDependencies: [
    "@aws-cdk/assert",
    "@aws-cdk/aws-rds",
  ],
  cdkDependencies: [
    "@aws-cdk/aws-cognito",
    "@aws-cdk/aws-ec2",
    "@aws-cdk/aws-efs",
    "@aws-cdk/aws-ecs",
    "@aws-cdk/aws-secretsmanager",
    "@aws-cdk/aws-elasticloadbalancingv2",
    "@aws-cdk/aws-elasticloadbalancingv2-targets",
    "@aws-cdk/aws-logs",
    "@aws-cdk/core",
  ],
});

// project.tsconfig.include.push('test/**/*.integ.ts');

project.synth();
