const path = require("path");
const SftpClient = require('ssh2-sftp-client');

require('dotenv').config()

const config = {
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  port: process.env.PORT || 22,
};

async function main() {
  const client = new SftpClient();

  const localPath = path.join(__dirname, 'dist');
  const remotePath = process.env.REMOTE_PATH;

  try {
    client.on('upload', info => {
      console.log(`Uploaded ${info.source}`);
    });

    await client.connect(config);
    await client.rmdir(remotePath, true);
    await client.uploadDir(localPath, remotePath);
  } finally {
    return client.end();
  }
}

main()
  .then(msg => {
    console.log(msg);
  })
  .catch(err => {
    console.log(`main error: ${err.message}`);
  });
