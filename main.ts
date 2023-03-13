import { Construct } from "constructs";
import { App, TerraformStack, TerraformOutput, S3Backend } from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";

import { EC2Module } from "./modules/ec2/ec2instance";
import { Variables } from "./variables";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, `${Variables.provider}`, {
      region: `${Variables.region}`,
    });

    const myId = "myFirstInstanceID";
    const tags = {
      "Name": myId
    }
    const ec2Instance = new EC2Module(this, myId, tags);

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
    region: `${Variables.region}`
  }
);

app.synth();

