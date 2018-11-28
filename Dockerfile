FROM node:10

RUN npm install -g sails

WORKDIR /app
EXPOSE 1337

CMD sails lift
