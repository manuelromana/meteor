FROM node
RUN apt-get update && apt-get install yarn --assume-yes
RUN mkdir app
WORKDIR /app
COPY ./yarn.lock ./
COPY ./package.json ./

RUN yarn
COPY . .
EXPOSE 3000
CMD  yarn start 