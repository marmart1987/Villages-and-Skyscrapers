const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2MjYzZDA5NzQ1YjUwMzJlNTdmYTZlMWQwNDFiNzdhNTQwNjZkYmQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5NjYzODE2MTQzOTEtY2jubms5YmVnczk3M3RmajIxNm5uMzkzOGs1anIzdXIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI5NjYzODE2MTQzOTEtY2Jubms5YmVnczk3M3RmajIxNm5uMzkzOGs1anIzdXIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTU3NzA4NDczMDA4ODY2MjY4MzUiLCJlbWFpbCI6Im1hcm10azE4MTFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTY5NzI2MTgyNywibmFtZSI6Ik1hcnRpbiBUaG9tYXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS2VsMjZUSmJoVUtGTmFFRk5jeVM4eUh1Q2ttazJjVVpSRmlrUWIzcFJycFlFPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ik1hcnRpbiIsImZhbWlseV9uYW1lIjoiVGhvbWFzIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2OTcyNjIxMjcsImV4cCI6MTY5NzI2NTcyNywianRpIjoiMDkwOWJkZjJjMmY4M2E5ZGFlNzcwMDFmYmQ1MWQyYjI1NGYwMmM5MiJ9.SIGGfhzlKefJTiHlY-FqxC6nVIFZ6cZkyCyMDDg-VUF8AEuH3pQgOY5DJs4yla1e-XzLla2RlIk0tGDIbV-5SIwto9GGe8yxmkiC96e1A_m5sf1XpYBUgk6ZGEE5cU0Ua5Twd7z2bucwB5nX4bJ3bya5QBMV8Fdic4NvjKjzz2-bAFAOraNCoAVLrMJXrGJgKz8Bilu8IpYUOpElrUW02n0mKglzLmytE0qTF190lHm-8xVhEr--9iN8b5ynJVQOXf3ybyvfgXTiomddJwhqf6yH24Q0bnI9eTWC3jrVHBfNY_7F4zFmKjA3LNezzYKMeGsRGHsQ1vJue5N4kcd3NA",
      audience: "966381614391-cbnnk9begs973tfj216nn3938k5jr3ur.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
    const payload = ticket.getPayload();
    console.log(payload)
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
verify().catch(console.error);