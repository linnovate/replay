#!/bin/bash

killall -s KILL node
killall -s KILL gulp
NODE_ENV=devbr nodemon ../replay-api/api-service &
node ../replay-api/query-service/app.js &
node ../replay-api/media-url-provider/app.js &
NODE_ENV=devbr gulp
