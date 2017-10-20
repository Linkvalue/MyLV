# CraCra

[![Travis](https://img.shields.io/travis/LinkValue/CraCra.svg?style=flat-square)](https://travis-ci.org/LinkValue/CraCra)

CRA editor for LinkValue built with React, Redux and [SaguiJS](https://github.com/saguijs/sagui) (Webpack, Babel, Eslint, SCSS).
The objective of this project is to be able to fill out your CRA within 10 seconds without effort.

## Installation

Before anything, be sure to have Node 7.9.x at least installed.
Before anything you'll have to create a local configuration file under `config/local.{js,json}` containing the
following fields:

```json
{
  "lvconnect": {
    "appId": "LvConnect app id used for login",
    "appSecret": "LvConnect app secret used for login"
  }
}
```

This file can override any fields contained in other configuration files. More information about configuration
[here](https://www.npmjs.com/package/config).

Next, you'll have to install the dependencies by running:

```
npm
```

To build the frontend application for production use, you'll have to run:

```
npm run dist
```

Finally, to start the application in production environment:

```
NODE_ENV=production node .
```

## Development

You can run the server and its database in a docker by running :

```
docker-compose up
```

Note : You will need to update/create the configuration file `config/local.js` to run node on correct host.

```
module.exports = {
  host: {
    hostname: '0.0.0.0',
  },
  lvconnect: {
    appId: '731c8e87-xxxx-xxxx-xxxx-xxxxxxxxxxx',
    appSecret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    endpoint: 'https://lvconnect.link-value.fr', // use lvconnect prod
  },
  mongodb: {
    host: 'db', // http://db is the docker address in the default network
    port: 27017,
    database: 'cracra',
    config: {
      useMongoClient: true,
    },
  },
}
```



## Contributing

This project uses ESLint to check code style and uses the default configuration from SaguiJS which is semicolon free.
We recommend the usage of a plugin for your IDE to enable lint inside it. At this moment the project is lacking unit
testing and feature testing which opens a window for regressions so be careful.

To start the frontend watch mode build, run:

```
npm run start
```

And for the backend watch mode, run:

```
npm run start:server
```

## Licence

Copyright (c) 2016 LinkValue

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

