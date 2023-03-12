import { Construct } from "constructs";
import { App, TerraformStack, S3Backend } from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
// import { Instance } from "@cdktf/provider-aws/lib/instance";

import { Ec2Module } from "./.gen/modules/EC2Module";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "AWS", {
      region: "eu-west-1",
    });

    const myId = "myFirstInstanceID";
    new Ec2Module(this, myId);


    // new Instance(this, "compute", {
    //   ami: "ami-08fea9e08576c443b",
    //   instanceType: "t2.micro",
    // });

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

