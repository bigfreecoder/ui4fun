ReactJS Starter Package:)
======================

This is the starter kit for ReactJS, React-Router and Fluxxor based on NodeJS.
We support Nodejs 0.12.x.

## Overview

We use the following major modules on both client and server:
* [React](https://github.com/facebook/react) (UI components)
* [Fluxxor](https://github.com/BinaryMuse/fluxxor) (FLUX)
* [React-Router](https://github.com/rackt/react-router) (routing)
* [axios](https://github.com/mzabriskie/axios) (HTTP request)
* [lodash](https://github.com/lodash/lodash) (Utility lib)
* [mocha](https://github.com/mochajs/mocha) (Test Framework)
* [chai](https://github.com/chaijs/chai) (Test assertion framework)

On top of a basic [Express](https://github.com/visionmedia/express) app.

We use [Webpack](http://webpack.github.io/) and [Grunt](https://gruntjs.com/) to
package our server-side CommonJS modules in a way that allows us to use them in
the client-side.

## Features

- React.js + React Router + Fluxxor on the client and server.
- Client side and Server side rendering.
- Grunt + Webpack for watch + production builds, extract third party lib to a js bundle.
- React Hot Loader for instant client updates.
- Multi Themes Mechanism support.
- Promsie based API Request Call, which support  request and response interception.
- Localization(L10N) and Internationalisation(I18N) support.
- Test With Mocha and Chai, Integrate with Grunt for automation test.

## Installation

NodeJS with npm binaries and installers are available at http://nodejs.org.
Grunt and CLI binaries and installers are available at http://gruntjs.com.

After you clone or download this starter kit, you need run this command inside your source directory to install module dependencies.

```bash
  npm install
```

Run `grunt server` and `grunt hot` in two terminal windows.

Run `open -a /Applications/Google\ Chrome.app --args --disable-web-security` on Mac to open Chrome with disable security model. (Because we use gcc api to get data which does not support CROS, so we need disable security. If you use Windows, please search how to disable web security on Windows)

Then type `http://locahost:8000` on Chrom to see the example.

## Usage

We provide these commands for node server, hot loader server, build and test. node and hot servers should run in two different terminals.

```bash
  # start node dev server as default
  grunt server
  # explicitly start node server for development
  grunt server:dev
  # explicitly start node server for production
  grunt server:prod

  # start react hot loader server
  grunt hot

  # build js and css file for dev as default
  grunt build
  # explicitly for development build
  grunt build:dev
  # explicitly for produtions build
  grunt build:prod

  # run mocha test
  grunt test

```

## Source Code Structure

```
.
├── app
│   ├── actions           // Fluxxor actions
│   ├── stores            // Fluxxor stores
│   ├── constants         // define some contants here, like action dispatch type
│   ├── utils             // utility function
│   ├── views             // put all reactjs component here
│   │   ├── layout.hbs    // template used for page render
│   │   ├── components    // put reusable component here, do not mixin with Fluxxor
│   │   │   ├── Button.jsx
│   │   │   └── CategoryItem.jsx
│   │   └── pages         // use for generate routes. It should mixin with Fluxxor to get data from stores.
│   │       ├── App.jsx
│   │       ├── Category.jsx
│   │       ├── Dock.jsx
│   │       ├── Home.jsx
│   │       ├── Html.jsx
│   │       ├── Login.jsx
│   │       └── Product.jsx
│   ├── api_client.js     // api request client, we use "axios"
│   ├── client.js         // client entry
│   ├── init.js           // init Fluxxor
│   ├── routes.jsx        // define routes here, require component from ./views/pages
│   └── server.js         // node server container
├── assets                // put css and image and font here.
│   ├── images
│   └── themes
├── lib
│   ├── Localization
│   └── cookie
├── node_modules
├── public                // build file will put here
│   ├── dist
│   └── favicon.ico
├── test
│   ├── Readme.md
│   ├── component.js
│   ├── data
│   ├── localization.js
│   └── setup
├── index.js              // start node server. suggest with pm2 when run on production
├── Gruntfile.js
├── build.config.js       // build configruation, when do webpack will get config from this.
├── webpack.config.js     // webpack base config file.
├── webpack.dev.js        // webpack development configuration
├── webpack.prod.js       // webpack production configuration
├── package.json
└── README.md

```

## How to Use

1. [Server Side Render](./docs/ServerSideRender.md)
2. [Hot Loader](/docs/HotLoader.md)
3. [Multi Themes Mechanism](/docs/Theme.md)
4. [API Client](/docs/API_Cliet.md)
5. [Localization](/lib/Localization)
6. [Test](/test)

## Next Step
1. integrate with nightwatch.js for automated browser testing
2. More Documentation
3. More Examples

## Contributing

1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -m 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D







