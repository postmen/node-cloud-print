var test = require('unit.js');
var plugin_class = require('../plugins/google_cloudprint_plugin');
var plugin = new plugin_class({});

describe('Test basic flow', function () {

    var cloud_print_service = plugin.cloud_print;
    beforeEach(function(){

    });

    afterEach(function(){
        if(cloud_print_service.printers.search.restore) {
            cloud_print_service.printers.search.restore();
        }
    });

    it('Should pass err to callback', function(){
        (function(){
            var err = new Error('error message');
            test.stub(cloud_print_service.printers, 'search', function (params, callback) {
                callback(err, null);
            });
            var spy = test.spy();
            plugin.getPrinters({},spy);
            test.assert(spy.calledWith(err, null));
        })();
    });

    it('Should callback auth err when no auth info passed in', function(){
        (function(){
            test.stub(cloud_print_service.printers, 'search', function (params, callback) {
                callback(null, null);
            });
            var spy = test.spy();
            plugin.getPrinters({},spy);
            test.assert(spy.calledWith(test.sinon.match({'message':'Missing authentication info.'}), null));
        })();
    });

    it('Should callback no response error when response in null', function(){
        (function(){
            plugin.oauth2_client = {};
            plugin.oauth2_client.refreshAccessToken = function (callback)
            {
                callback(null, {});
            };
            test.stub(cloud_print_service.printers, 'search', function (params, callback) {
                callback(null, null);
            });
            var spy = test.spy();
            plugin.getPrinters({},spy);
            test.assert(spy.calledWith(test.sinon.match({'message':'No response.'}), null));
        })();
    });

    it('Should pass error to when refresh token failed', function(){
        (function(){
            var err = new Error('error message');
            var plugin = new plugin_class({});
            plugin.oauth2_client = {};
            plugin.oauth2_client.refreshAccessToken = function (callback)
            {
                callback(err, {});
            };
            var spy = test.spy();
            plugin.getPrinters({},spy);
            test.assert(spy.calledWith(err), null);
        })();
    });

    it('Should callback credential error when get html 403 error', function(){
        (function(){
            var plugin = new plugin_class({});
            plugin.oauth2_client = {};
            plugin.oauth2_client.refreshAccessToken = function (callback)
            {
                callback(null, {});
            };
            test.stub(cloud_print_service.printers, 'search', function (params, callback) {
                callback(null, '<html>User credentials required</html>');
            });
            var spy = test.spy();
            plugin.getPrinters({},spy);
            test.assert(test.sinon.match({'message':'User credentials required'}), null);
        })();
    });

    it('Should callback unknown error when get html error other than 403', function(){
        (function(){
            var plugin = new plugin_class({});
            plugin.oauth2_client = {};
            plugin.oauth2_client.refreshAccessToken = function (callback)
            {
                callback(null, {});
            };
            test.stub(cloud_print_service.printers, 'search', function (params, callback) {
                callback(null, '<html>Error</html>');
            });
            var spy = test.spy();
            plugin.getPrinters({},spy);
            test.assert(test.sinon.match({'message':'Unknown response.'}), null);
        })();
    });

    it('Should callback error when response \'s "success" is false', function(){
        (function(){
            var plugin = new plugin_class({});
            plugin.oauth2_client = {};
            plugin.oauth2_client.refreshAccessToken = function (callback)
            {
                callback(null, {});
            };
            test.stub(cloud_print_service.printers, 'search', function (params, callback) {
                callback(null, {success: false, message:'error'});
            });
            var spy = test.spy();
            plugin.getPrinters({},spy);
            test.assert(test.sinon.match({'message':'error'}), null);
        })();
    });

});