import { InstanceClass, InstanceSize, InstanceType, Port } from '@aws-cdk/aws-ec2';
import { Cluster } from '@aws-cdk/aws-ecs';
import {
  ApplicationListener,
  ApplicationLoadBalancer,
  ApplicationProtocol,
  ListenerAction,
} from '@aws-cdk/aws-elasticloadbalancingv2';
import { CfnOutput, Construct, Stack, StackProps } from '@aws-cdk/core';

/**
 * A stack for integration testing.
 */
export class TestingClusterStack extends Stack {
  public readonly cluster: Cluster;
  public readonly alb: ApplicationLoadBalancer;
  public readonly albListener: ApplicationListener;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.cluster = new Cluster(this, 'cluster');
    this.cluster.addCapacity('capacity', {
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
    });

    this.alb = new ApplicationLoadBalancer(this, 'alb', {
      vpc: this.cluster.vpc,
      internetFacing: true,
    });

    this.cluster.connections.allowFrom(this.alb.connections, Port.allTcp());

    this.albListener = this.alb.addListener('http', {
      protocol: ApplicationProtocol.HTTP,
      defaultAction: ListenerAction.fixedResponse(404, {
        contentType: 'text/plain',
        messageBody: '404 not found',
      }),
    });

    new CfnOutput(this, 'AlbDnsName', {
      value: this.alb.loadBalancerDnsName,
    });
  }
}