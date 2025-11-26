/**
* MIT License
* 
* Copyright (c) 2025 By Wise Consulting
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
 **/

var path = require("path");
var googleStrategy = require("passport-google-oidc");

var requiredOptions = [
    'clientID',
    'clientSecret',
    'baseURL',
    'users'
];

module.exports = function(opts) {
    for (var i=0;i<requiredOptions.length;i++) {
        if (!opts.hasOwnProperty(requiredOptions[i])) {
            throw new Error("Missing auth option: "+requiredOptions[i]);
        }
    }

    var callbackURL = opts.baseURL+
        ((opts.baseURL[opts.baseURL.length-1] === "/")?"":"/")+
        "auth/strategy/callback";

    var adminAuth = {
        type:"strategy",
        strategy: {
            name: "google",
            label: 'Sign in with Google',
            icon:"fa-google",
            strategy: googleStrategy.Strategy,
            options: {
                clientID: opts.clientID,
                clientSecret: opts.clientSecret,
                callbackURL: callbackURL,
                verify: function(issuer, profile, done) {
                    console.info(`Google OIDC user authenticated. Add this to your setting.json adminAuth.users array to allow user access to Node-RED: { username: "${profile.id}", permissions: "*" }`);
                    done(null,profile.id);
                }
            }
        },
        users: opts.users
    };
    if (opts.hasOwnProperty('default')) {
        adminAuth.default = opts.default;
    }

    return adminAuth;

};
