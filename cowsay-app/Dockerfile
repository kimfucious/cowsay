FROM node:alpine
RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN apk add --update nodejs
COPY package.json /app/
RUN npm install
COPY . /app/ 
CMD ["npm", "start"]