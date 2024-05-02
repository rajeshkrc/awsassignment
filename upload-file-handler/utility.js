const parseMultipart =  require("aws-lambda-multipart-parser");
exports.extractFileinfo = (event) => {
    console.log(event.headers['Content-Type']);
   
    const parts = result = parseMultipart.parse(event, true);
    console.log(JSON.stringify(parts));
    const {filename, contentType, content} = parts[Object.keys(parts)];
    return {
        filename,
        contentType,
        content
    }
}