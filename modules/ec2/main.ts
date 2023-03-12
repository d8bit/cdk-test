import { Construct } from "constructs";
import { TerraformStack, TerraformOutput } from "cdktf";
import { Instance } from "@cdktf/provider-aws/lib/instance";

export class EC2Module extends TerraformStack {

  public publicIp: string

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const ec2Instance = new Instance(this, id, {
      ami: "ami-08fea9e08576c443b",
      instanceType: "t2.micro",
    });

    this.publicIp = ec2Instance.publicIp
    new TerraformOutput(this, "public_ip", {
      value: ec2Instance.publicIp,
    });

  }

}
