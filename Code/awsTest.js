
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
  print(s3)

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
 
  