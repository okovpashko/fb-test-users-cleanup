# Facebook test users remover

## Getting started
1. Clone repo
2. Install dependencies: `npm install`
3. Run: `node src/index.js --help`

## CLI options

### -i, --app-id <id>
Facebook app id. Can be found in the app's developers console.

### -t, --app-token <token>
Facebook app token. Allows making Graph API requests on behalf of an app. See 
[developer docs](https://developers.facebook.com/docs/facebook-login/access-tokens/#apptokens) or use 
[Graph API explorer](https://developers.facebook.com/tools/explorer/) to generate a token.


### -c --concurrency <number>
Optional. Defines how many user-removing requests will be sent simultaneously. Be aware that Graph API might start returning 
errors when about 10 simultaneous requests are sent. Default is 5.

### -m --max-users <number>
Optional. Defines how many test users must be removed. Default is 100.

### -h, --help
Shows usage help
