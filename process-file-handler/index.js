const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
    console.log(JSON.stringify(event));
    const bucketName = process.env.BUCKET_NAME;
    const key = event.Records[0].s3.object.key;

    console.log(`bucketName: ${bucketName} and key: ${key}`);

    try{
        const data = await s3.getObject({
            Bucket: bucketName,
            Key: key
        }).promise();

        console.log(JSON.stringify(data));
        const csvData = data.Body.toString('utf-8');
        console.log(csvData);
        const emails =  csvData.split('\r\n');
        console.log(emails);
        return {
            statusCode: 200,
            body: 'Read CSV file'
        }
        
    } catch(error) {
        console.log("error============");
        console.log(error);
        return {
            statusCode: 500,
            body: `Error: ${error}`
        }
    }
}