# Replay frontend
A frontend app for the [repaly-api](https://github.com/linnovate/replay-api) & [replay-infra](https://github.com/linnovate/replay-infra)

## Infrastructure
This application uses [NG6 boilerplate](https://github.com/AngularClass/NG6-starter), for more info please read there.

# Getting Started
## Dependencies
Tools needed to run this app:
* `node` and `npm`
Once you have these, install the following as globals:  
`npm install -g gulp karma karma-cli webpack`

## Installing
* `clone` this repo
* `npm install -g gulp karma karma-cli webpack` install global cli dependencies
* `npm install` to install dependencies

## Running the App
The app uses Gulp to build and launch the development environment. After you have installed all dependencies, you may run the app. Running `gulp` will bundle the app with `webpack`, launch a development server, and watch all files. The port will be displayed in the terminal.
 
### Gulp Tasks
Here's a list of available tasks:
* `webpack`
  * runs Webpack, which will transpile, concatenate, and compress (collectively, "bundle") all assets and modules into `dist/bundle.js`. It also prepares `index.html` to be used as application entry point, links assets and created dist version of our application.
* `serve`
  * starts a dev server via `webpack-dev-server`, serving the client folder.

## Configurations
Set environment variables to config the app:

| Name                          | Description                                  | Default        |
|-------------------------------|----------------------------------------------|----------------|
| GOOGLE_CLIENT_ID			    | Google client id           			       |726385581494-3te31aa3t09polsm5paeg4eeh9qgbcgl.apps.googleusercontent.com|
| FE_API_HOST   			    | Host name including port (if any)  	       |http://localhost:1337|
| FE_API_URL       			    | API url including port (if any)  	           |http://localhost:1337/api/v0.1|


## Usage
Simple run
```
gulp serve
```
Run with different variables
```
FE_API_HOST=http://example.com:1337 FE_API_URL=http://example.com:1337/api/v0.1 gulp serve
```
Production deployment
* Step 1: Make a bundle
```
FE_API_HOST=http://production.com FE_API_URL=http://api.production.com/api/v0.1 gulp webpack
```
* Step 2: Use generated folder `dist`


## App structure
App is built in a component or modular way, almost everything is a component.

![](http://joxi.ru/NDrlXdnHEXwvrP?d=1)

Folder organization

![](http://joxi.ru/WKAxl1OUQgPlA8?d=1)

`common`: components that are used across multiple places

`components`: the majority of the components reside here

`service`: common services widely used

## Authentication
[Satellizer lib](https://github.com/sahat/satellizer) is used for request authorizations
Satellizer is a simple to use, end-to-end, token-based authentication module for AngularJS with built-in support for Google, Facebook, LinkedIn, Twitter, Instagram, GitHub, Bitbucket, Yahoo, Twitch, Microsoft (Windows Live) OAuth providers, as well as Email and Password sign-in. However, you are not limited to the sign-in options above, in fact you can add any OAuth 1.0 or OAuth 2.0 provider by passing provider-specific information in the app config block.
No sessions are stored on the server, as JWT encoded token is passed with every request.
State is stored only locally in the browser (localStorage or sessionStorage available to use)
Also, an important thing is that: JWT token is not revocable, it expires after some time (default 14 days)
  
## Component structure
From angular 1.5 we can you .component method to create our own components with well designed API inputs & outputs [read more here](https://docs.angularjs.org/guide/component)
  
### Component detail view  
Most of the page elements are made of this simple entities: 
  ```
  ⋅⋅home/ * home component
  ⋅⋅⋅⋅home.js * home entry file (routes, configurations, and declarations occur here)
  ⋅⋅⋅⋅home.component.js * home "directive"
  ⋅⋅⋅⋅home.controller.js * home controller
  ⋅⋅⋅⋅home.styl * home styles
  ⋅⋅⋅⋅home.html * home template
  ⋅⋅⋅⋅home.spec.js * home specs (for entry, component, and controller)
  ```

## Routing
For the routing we use [angular-ui-router](https://github.com/angular-ui/ui-router) as it is the most robust and flexible solution currently.
Available routes so far:
```
/
/map
/map/playlist
/map/playlist/57c1d7f0a11062c5694de9b8
```


## Map business logic
All map related logic resides in `components/map` component. The main file is `map.service.js`
All map features, e.g. heated map, video tracking etc, are done with separate services sush as: `track.service.js` & `heamap.service.js` and so (service directory inside the component). 


trigger jenkins test
