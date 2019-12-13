const fs = require("fs");
const { resolve } = require("path");
const FtpDeploy = require("ftp-deploy");

const ftpDeploy = new FtpDeploy();

const { host, remoteRoot, user, password } = JSON.parse(
  fs.readFileSync(resolve(process.cwd(), ".private"), "utf-8")
);

var config = {
  user,
  password,
  host,
  port: 21,
  localRoot: __dirname + "/dist",
  remoteRoot,
  include: ["*", "**/*"],
  exclude: [".*"],
  deleteRemote: false
};

ftpDeploy.deploy(config, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("finished");
  }
});
