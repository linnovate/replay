#!/bin/bash

# general
export MONGO_HOST=13.94.255.166
# authentication-service
export BASE_URL=https://replay.server.me
export FRONTEND_URL=https://replay.server.me
export FRONTEND_PORT=443
# frontend
export FE_API_HOST=https://replay.server.me
export FE_API_URL=https://replay.server.me/api/v0.1

# clean up before run
killall -s KILL node
killall -s KILL gulp

# run
node ../replay-api/authentication-service &
node ../replay-api/query-service/app.js &
node ../replay-api/authorization-service/app.js &
node ../replay-api/media-url-provider/app.js &
node ../replay-api/playlist-service/app.js &
gulp
