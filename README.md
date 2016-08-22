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
FE_API_HOST=http://example.com:1337 FE_API_URL=http://example.com:1337/api/v0.1 gulp server
```
Production deployment
* Step 1: Make a bundle
```
FE_API_HOST=http://production.com FE_API_URL=http://api.production.com/api/v0.1 gulp webpack
```
* Step 2: Use generated folter `dist`
