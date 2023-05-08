
 //* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 //* SPDX-License-Identifier: Apache-2.0
 
 
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:6f08b6e9-cb5a-4ac5-a418-096b814b92c9',
});

var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: "vandsbucket"}
  });
  console.log(s3)
/*
 s3.listObjects({Bucket:"vandsbucket"},function an(err,data){
    print(err,data)
    for(i = 0; i <data.Contents.length;i++){
    
   
    
    var href = this.request.httpRequest.endpoint.href;
    
    bucketUrl = href + "vandsbucket" + "/" +data.Contents[i].Key
    let a = httpGet(bucketUrl,"text")

     
     a.then((successMessage) => {
        
        console.log(`${successMessage}`);
      })
      
    }
}

);

// Set the region where your identity pool exists (us-east-1, eu-west-1)
/*
AWS.config.region = 'us-east-1';

// Configure the credentials provider to use your identity pool

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1_YG9VDUjlD',
    Logins: { // optional tokens, used for authenticated login
      
        
        'accounts.google.com': 'GOOGLETOKEN',
        
        
        
    }
});

// Make the call to obtain credentials
AWS.config.credentials.get(function(){

    // Credentials will be available when this function is called.
    var accessKeyId = AWS.config.credentials.accessKeyId;
    var secretAccessKey = AWS.config.credentials.secretAccessKey;
    var sessionToken = AWS.config.credentials.sessionToken;
    print(accessKeyId,"            ",secretAccessKey,"        ",sessionToken)

});

 
  */