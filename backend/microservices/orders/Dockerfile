FROM node:latest

WORKDIR /src

COPY . /src

COPY ../database /src

RUN npm install

EXPOSE 4000

CMD npm start