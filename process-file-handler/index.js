const AWS = require('aws-sdk');
const { BatchProcessor, EventType, processPartialResponse } = require("@aws-lambda-powertools/batch");
const s3 = new AWS.S3();
const processor = new BatchProcessor(EventType.SQS);

exports.handler = async (event) => {
    console.log(JSON.stringify(event));
   return await processPartialResponse(event, recordHandler, processor);
}

const recordHandler = async (record) => {
    const bucketName = process.env.BUCKET_NAME; 
    
    record = JSON.parse(record.body).Records[0];
    console.log(JSON.stringify(record));

    if (record.s3 && record.s3.object) {
        const key = record.s3.object.key;

        console.log(`bucketName: ${bucketName} and key: ${key}`);
        const data = await s3.getObject({
            Bucket: bucketName,
            Key: key
        }).promise();

        console.log(JSON.stringify(data));
        const csvData = data.Body.toString('utf-8');
        console.log(csvData);
        const emails =  csvData.split('\r\n');
        console.log(emails);  
    }    
    
}
