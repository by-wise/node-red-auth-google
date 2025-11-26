# Node-RED Authentication with Google Workspace

[Node-RED](https://nodered.org) plugin for authenticating users with Google.

This modules lets you restrict access to the Node-RED editor to specific Google Workspace
users.

**Note:** this requires Node-RED 0.17 or later

## Install

In your Node-RED user directory, typically `~/.node-red`:

```console
$ npm install @by-wise/node-red-auth-google
```

## Usage

### Register a new Google application OAuth 2.0 ID

To enable access control with Google Workspace, you must first [register a new application
on your Google Cloud Platform account](https://www.passportjs.org/packages/passport-google-oidc/#register-application).

Once created, you will be provided a _Client ID_ and _Client Secret_ that
you will need to use to configure the authentication plugin.

### Configure `adminAuth`

Access control for the Node-RED editor is configured in your `settings.js` file
using the `adminAuth` property.

```javascript
adminAuth: require('@by-wise/node-red-auth-google')({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    baseURL: "http://localhost:1880/",
    users: [
        { username: "google_user_id",permissions: ["*"]}
    ]
})
```

The `baseURL` property is the URL used to access the Node-RED editor.

The `users` property is the list of Google Workspace users who are allowed to access the
editor. It is the same as used by `adminAuth` as described in the [security documentation](http://nodered.org/docs/security), but without the `password` property.

A default user can be specified by adding a `default` property to the options object:

```javascript
users: [
        ...
    ],
default: {
        permissions: "read"
    }
```

## Copyright and license

By Wise Consulting, http://bywise.com.br under [the MIT license](https://mit-license.org/).
Based on [node-red-auth-github](https://github.com/node-red/node-red-auth-github): Copyright JS Foundation and other contributors, http://js.foundation under [the Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0.txt).