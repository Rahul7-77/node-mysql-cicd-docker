FROM node:alpine

WORKDIR /user/nodeapp

COPY ./package.json ./
RUN npm install

COPY . .

CMD [ "npm","start" ]