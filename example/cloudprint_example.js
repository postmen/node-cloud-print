/**
 * Created by FeikoLai on 27/8/14.
 */

var util = require('util');
var CloudPrint = require('../index');

var cloudprint = new CloudPrint({
    service_provider: 'google',
    auth: {
        client_id: '586748347463-deejt4dt0nkec8f5fic4opkcpatf1t5u.apps.googleusercontent.com',
        client_secret: 'N9eumiy16ciGlawjk68FJZPK',
        redirect_uri: 'https://nodejstest-c9-dg3feiko.c9.io/auth/google/callback',
        access_token: 'ya29.bgCtr8UG0JKRRyEAAAAfor3USgJK_u2MBhg7k5p2Cbwks9tEAgJhMbN9xk15_QakyYT9GOT4MSe8VeTftRk',
        refresh_token: '1/euLHaGvofYA8dhA3F-Vt89v_ShPNlHWVEpJ0eFUbkcg'
    }
});

//cloudprint.getPrinters({}, function (err, response) {
//        console.log('response: ' + util.inspect(response, {showHidden: false, depth: null}));
//        console.log('err: ' + util.inspect(err, {showHidden: false, depth: null}));
//    }
//);

//cloudprint.getPrinter('__google__docs', function (err, response) {
//        console.log('response: ' + util.inspect(response, {showHidden: false, depth: null}));
//        console.log('err: ' + util.inspect(err, {showHidden: false, depth: null}));
//    }
//);

cloudprint.print({
        title:'Print job title',
        content: 'http://img2.wikia.nocookie.net/__cb20140704030242/dogkids-wiki-of-wonder/images/a/a0/Keroro.gif',
        printer_id : "__google__docs",
        setting:{}
    }, function (err, response) {
        console.log('response: ' + util.inspect(response, {showHidden: false, depth: null}));
        console.log('err: ' + util.inspect(err, {showHidden: false, depth: null}));
    }
);




