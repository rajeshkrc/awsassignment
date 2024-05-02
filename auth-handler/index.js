exports.handler = async function(event) {
    const SECURITY_TOKEN = "UploadFileAssignment";
   
    const token = event.authorizationToken ?? '';
    const isValid = token === SECURITY_TOKEN;

    console.log(`token: ${token} and isValid: ${isValid}`); 

    return {
        principalId: 'user',
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: isValid ? 'Allow' : 'Deny',
                    Resource: event.methodArn
                }
            ]
        }
    }
}