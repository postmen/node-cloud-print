/**
 * Created by FeikoLai on 27/8/14.
 */

(function () {

    'use strict';

    module.exports = function (options) {
        options = options || {};

        //dependency injection
        if (options.service_provider === 'google') {
            var plugin_class = require('./plugins/google_cloudprint_plugin.js');
            this.plugin = new plugin_class(options);
        } else {
            //other service providers
        }

        this.getPrinters = function (params, callback) {
            this.plugin.getPrinters(params, callback);
        };

        this.getPrinter = function (params, callback) {
            this.plugin.getPrinter(params, callback);
        };

        this.print = function (params, callback) {
            this.plugin.print(params, callback);
        };
    };

})();
