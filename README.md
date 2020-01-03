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
3. mongodb_data is persistant storage MongoDB database.

☝️ You need to create the mongodb_data directory and give it the correct permissions.

## Prerequisites

1. [Docker](https://www.docker.com/products/docker-desktop)
2. [Docker Compose](https://docs.docker.com/compose/install/)

All services are provisioned via Docker, using Docker Compose.

## Setup

1. Clone this repo to the directory of your choice:

```console
git clone https://github.com/kimfucious/cowsay.git
```

2. Change into the newly cloned directory

3. Create `mongodb_data` directory and give set permissions on it:

☝️ There is no initial database. You need to first create a new directory `mongodb_data` and set permissions on it, like so:

```console
mkdir mongodb_data
sudo chown -hR 1001:1001 ./mongodb_data/
```

## Get things running

### Run Docker Compose

1. After you've done the above, navigate to the root of this cloned repo
2. Run `docker-compose up`
3. The first time run will setup MongoDB. You should see something like the following amidst the output:

```console
mongodb_1  |  18:02:30.89 INFO  ==> Deploying MongoDB from scratch...
```

☝️ Subsequent starts will not create db users! See [here](#rebuild-the-database) for help on that.

MongoDB is up when you see `waiting for connections on port 27017`

## Notes

- Docker-compose will pull, build, and run three containers:

  - The web app will run on (port 80) at http://localhost
  - The api will run on port 4000. You can access `graphiql` at http://localhost:4000/graphql
  - The database will run on port 27017. You can access it using [Compass](https://www.mongodb.com/products/compass) with mongodb://user:secret@localhost:27017/cowsay?authSource=cowsay

- Changes made to the app or api code will restart the respective services on save.

- The db gets created with users on first run of `docker-compose`, but, again, you need to ensure that the file permissions are set correctly on `mongodb_data`, as just stated, in order for things to work. See note [here](https://github.com/bitnami/bitnami-docker-mongodb#persisting-your-database) for details.

- env files are found in each directory, including the root directory. These files have been intentionally _not excluded_ from this repo, but should be, if/when you ever fork a copy of this repo for anything going forward. See [here](https://www.npmjs.com/package/dotenv#should-i-commit-my-env-file) for details.

- Yes, the Auth0 client secret has been rotated.

- The `app.listen()` function and `mongoose.connect()` functions have been separated out of `app.js` and placed in `start.js` so as to separate facilitate testing.

- The API's token authentication is "manual", for demonstration purposes, rather than using a third-party solution.

- To test the API using `graphiql`, comment out the authorization lines in `cowsay_api/src/graphql/resolvers.js`, like this:

```js
getCows: (args, req) => {
  // if (!req.isAuthorized) throw newError(403, "Forbidden");
  return cows;
};
```

## Other Stuff

### Rebuild the database

1. `CTRL-C` in the terminal where your ran `docker-run-compose` to stop MongoDB
2. Delete the `mongodb` directory inside the `mongodb_data` folder without deleting the parent directory. Use `sudo rm -rf mongodb_data/mongodb/`, as permissions on folder aren't yours.
3. Change the `docker-compose.yml` settings as desired.
4. Run `docker-compose up`
