const AWS = require('aws-sdk');
const util = require('./utility');
const s3 = new AWS.S3();

exports.handler = async (event, context) => {
  const { BUCKET_NAME } = process.env;

  console.log(event);
  
  event.body = event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body;
  

  const { filename, content, ContentType} = util.extractFileinfo(event);
  const params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    ContentType,
    Body: content
  };

  try {
    await s3.upload(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File uploaded successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to upload file' })
    };
  }
};