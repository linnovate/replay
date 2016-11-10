FROM node:4.5.0
RUN git clone https://github.com/linnovate/replay.git
WORKDIR /replay
RUN git checkout develop ; npm install -g gulp karma karma-cli webpack ; npm install
EXPOSE 3000:3000

# GOOGLE_CLIENT_ID Provided by command
ENV FE_API_HOST=http://dev.replay.linnovate.net:1337 FE_API_URL=http://dev.replay.linnovate.net:1337/api/v0.1
CMD ["gulp", "serve"]
