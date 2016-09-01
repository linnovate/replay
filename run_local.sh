#!/bin/bash
# MONGO_HOST=dev.replay.linnovate.net:27017

killall -s KILL node
killall -s KILL gulp
BASE_URL=http://server.me nodemon ../replay-api/api-service &
node ../replay-api/query-service/app.js &
node ../replay-api/media-url-provider/app.js &
NODE_ENV=devbr gulp
