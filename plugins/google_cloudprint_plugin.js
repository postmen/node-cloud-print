/**
 * Created by FeikoLai on 27/8/14.
 */
(function () {

    'use strict';

    var google = require('googleapis');
    var cloud_print = google.cloudprint('beta');

    function _flow(params, callback, context, action) {
        if (!context.oauth2_client) {
            callback(new Error('Missing authentication info.'), null)
        } else {
            context.oauth2_client.refreshAccessToken(function (err, tokens) {
                if (err) {
                    callback(err, null);
                } else {
                    params.auth = context.oauth2_client;
                    //invoke do method
                    action(params, function (err, response) {
                        if (err) {
                            callback(err, response);
                        } else {
                            if (!response) {
                                callback(new Error('No response.'), null);
                            }
                            else {
                                //non-json response, usually it is a 401/403 error
                                if (typeof response === 'object') {
                                    if (response.success) {
                                        callback(err, {result: response, tokens: tokens});
                                    } else {
                                        if (response.message) {
                                            callback(new Error(response.message), response);
                                        } else {
                                            callback(new Error('Unknown error'), response);
                                        }
                                    }
                                } else {
                                    try {
                                        JSON.parse(response);
                                    } catch (e) {
                                        if (response.search('User credentials required') > -1) {
                                            callback(new Error('User credentials required'), null);
                                        } else {
                                            callback(new Error('Unknown response.'), null);
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }


    }

    module.exports = function (options) {
        options = options || {};

        var self = this;
        this.cloud_print = cloud_print;
        if (options.auth) {
            var auth = options.auth;
            this.oauth2_client = new google.auth.OAuth2(auth.client_id, auth.client_secret, auth.redirect_uri);
            this.oauth2_client.setCredentials({
                access_token: auth.access_token,
                refresh_token: auth.refresh_token
            });
        }

        this.getPrinters = function (params, callback) {
            _flow(params, callback, self, this.cloud_print.printers.search);
        };

        this.getPrinter = function (printer_id, callback) {
            var params = {printerid: printer_id};
            _flow(params, callback, self, this.cloud_print.printers.get);
        };

        this.print = function (params, callback) {

            //new ticket from settins
            var ticket = {
                print: params.settings,
                version: '1.0'
            };
            delete params.settings;
            //map properties
            params.renameProperty('tags','tag',[]);
            params.renameProperty('printer_id','printerid',null);
            params.renameProperty('content_type','contentType','url');
            params.ticket = ticket;

            _flow(params, callback, self, this.cloud_print.jobs.sumbmit);
        };

    }

    Object.defineProperty(
        Object.prototype,
        'renameProperty',
        {
            writable: false, // Cannot alter this property
            enumerable: false, // Will not show up in a for-in loop.
            configurable: false, // Cannot be deleted via the delete operator
            value: function (oldName, newName, default_value) {
                // Check for the old property name to
                // avoid a ReferenceError in strict mode.
                if (this.hasOwnProperty(oldName)) {
                    this[newName] = this[oldName];
                    delete this[oldName];
                } else {
                    this[newName] = default_value;
                }
                return this;
            }
        }
    );

})();


