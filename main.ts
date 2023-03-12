import { Construct } from "constructs";
import { App, TerraformStack, TerraformOutput, S3Backend } from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { Instance } from "@cdktf/provider-aws/lib/instance";
// import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "AWS", {
      region: "eu-west-1",
    });

    const ec2Instance = new Instance(this, "compute", {
      ami: "ami-08fea9e08576c443b",
      instanceType: "t2.micro",
    });

    new TerraformOutput(this, "public_ip", {
      value: ec2Instance.publicIp,
    });
  }
}

const app = new App();
const stack = new MyStack(app, "aws_instance");

new S3Backend(stack, {
    bucket: "mycdkstates",
    key   : "ec2instances",
    region: "eu-west-1"
  }
);

app.synth();

