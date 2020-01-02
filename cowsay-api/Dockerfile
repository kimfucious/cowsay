FROM starefossen/ruby-node:alpine 
RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json /app/
RUN npm install
RUN gem install cowsay
RUN apk update && apk add fortune && rm -rf /var/cache/apk/* 
COPY . /app/ 
EXPOSE 4000
CMD ["npm", "start"]