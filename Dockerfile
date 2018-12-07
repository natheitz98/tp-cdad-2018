FROM node:10

RUN npm install -g sails nodemon

WORKDIR /app
EXPOSE 1337

CMD nodemon --watch . sails lift
