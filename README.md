Cloud Print Module for Node.js
========================

Cloudprint is a node.js module providing convenient apis to perform cloud printing throught various cloud printing service provider.

At this moment only [Google Cloud Print](https://www.google.com/cloudprint) is available.

Usage (Draft)
========================

###Construct a cloud print instance

```js

var Cloudprint = require('cloudprint');

var cloudprint = new Cloudprint(
    {
        service_provider: 'google',
        auth: {
            client_id: 'YOUR_CLIENT_ID',
            client_secret: 'YOUR_CLIENT_SERECT',
            redirect_uri: 'REDIRECT_URI',
            access_token: 'ACCESS TOKEN',
            refresh_token: 'REFRESH_TOKEN'
        }
    });
    
```


###Get user's printer list

```js
var options = {};//extra options for filter
cloudprint.getPrinters(options, function(err, response){});
```

###Get specific printer info

```js
cloudprint.getPrinter("printer id", function(err, response){})
```

###Submit a print job

```js
var params = {
  title:'Print job title',
  content: 'http://abc.com/123.png',
  content_type: 'url', //optional, default = url
  printer_id : "123123123123-sdfjjv=123",
  tags: ['tag1','tag2'],//optional, default = [],
  setting:{
    
  }
};
cloudprint.print(params,function(err, response){});
```

### Response

raw response from service provider.


