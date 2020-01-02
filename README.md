# Multi-Tier Cowsay

```console
 ________
| Hello! |
 --------
      \   ^__^
       \  (oo)\_______
          (__)\       )\/\
              ||----w |
              ||     ||
```

## What is this?

This repo demonstrates:

1. Realtime development, using live Docker containers
2. GraphQL access to a backend API
3. JSON web token authentication
4. Persistent data storage, using MongoDB

This repo is comprised of three main directories:

1. cowsay-app is a front-end React web application
2. cowsay-api is a backend Express API, using [express-graphql](https://github.com/graphql/express-graphql)
3. mongodb_data is persistant storage MongoDB database

## Prerequisites

1. [Docker](https://www.docker.com/products/docker-desktop)
2. [Docker Compose](https://docs.docker.com/compose/install/)
3. [Node.js](https://nodejs.org/)

All of the above services are provisioned via Docker, using Docker Compose.

## Setup

1. Clone this repo to the directory of your choice:

```console
git clone https://github.com/kimfucious/cowsay.git
```

2. Run Docker Compose from the directory where you cloned the repo

```console
docker-compose up
```
