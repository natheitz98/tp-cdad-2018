FROM node:10


RUN npm install -g sails
RUN npm install -g nodemon
RUN npm install -g knex
RUN npm install -g emailjs
RUN npm install -g skipper-s3
WORKDIR /app
EXPOSE 1337

CMD nodemon --watch . sails lift
