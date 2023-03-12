import { Construct } from "constructs";
import { Instance } from "@cdktf/provider-aws/lib/instance";

export class EC2Module extends Construct {

  public publicIp: string

  constructor(scope: Construct, id: string, tags: any) {
    super(scope, id);

    const ec2Instance = new Instance(this, id, {
      ami: "ami-08fea9e08576c443b",
      instanceType: "t2.micro",
      tags: tags
    });

    this.publicIp = ec2Instance.publicIp

  }

}
