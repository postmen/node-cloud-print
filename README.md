Cloud Print Module for Node.js
========================

Cloud-Print-Nodejs is a node.js module providing convenient apis to perform cloud printing throught various cloud printing service provider.

At this moment only [Google Cloud Print](https://www.google.com/cloudprint) is available.

Usage
========================

###Construct a cloud print instance

```js

var CloudPrint = require('cloud-print');

var cloud_print = new CloudPrint(
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
cloud_print.getPrinters(options, function(err, response){});
```

###Get specific printer info

```js
cloud_print.getPrinter("printer id", function(err, response){})
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
cloud_print.print(params,function(err, response){});
```

### Response

```js
{
    "result":
    {
    //raw response from service provider.
    }
}

refer to: [Google Cloud Print API](https://developers.google.com/cloud-print/docs/appInterfaces)
```



