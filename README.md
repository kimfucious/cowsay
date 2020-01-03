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
3. mongodb_data is persistant storage for a MongoDB database

🐮 You need to create the mongodb_data directory and give it the correct permissions. See [Setup](#setup) step 3 below.

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

🐮 There is no initial database. You need to first create a new directory `mongodb_data` and set permissions on it, like so:

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

MongoDB is up when you see `waiting for connections on port 27017`

## Notes

- Docker-compose will pull images, then build and run three containers (this can take a while on the first run):

  - The web app will run on (port 80) at http://localhost
  - The api will run on port 4000. You can access `graphiql` at http://localhost:4000/graphql
  - The database will run on port 27017. You can access it, using [Compass](https://www.mongodb.com/products/compass), with mongodb://user:secret@localhost:27017/cowsay?authSource=cowsay

  This is all configured in `docker-compose.yml` and the Dockerfile files in the app and api directories.

- Changes made to the app or api code will restart the respective services _within the running containers_ on save, thanks to [nodemon](https://nodemon.io/). Changes to npm packages will not work without rebuilding the affected Docker image. See [here](#rebuilding-docker-images) for details.

- The db gets created on first run of `docker-compose`, but, again, you need to ensure that the file permissions are set correctly on `mongodb_data`, as just stated, in order for things to work. See note [here](https://github.com/bitnami/bitnami-docker-mongodb#persisting-your-database) for details.

- An initial `db` root and admin user are created on the first run of `docker-compose`.

🐮 Subsequent starts will not create db users, if/when you change environement variables! If you want to do that, rebuild the database. See [here](#rebuild-the-database) for help on that.

- An initial `web-app` admin user, `elsie@cowsay.moo`, is created when the API is first run. The initial password is set to `Passw0rd123`. This can be changed in `cowsay-api/src/start.js`.

- Env files are found in each directory, including the root directory. These files have been intentionally _not excluded_ from this repo, but should be, if/when you ever fork a copy of this repo for anything going forward. See [here](https://www.npmjs.com/package/dotenv#should-i-commit-my-env-file) for details.

- Yes, the Auth0 client secret has been rotated.

- The `app.listen()` function and `mongoose.connect()` functions have been separated out of `app.js` and placed in `start.js` so as to separate facilitate testing.

- The API's token authentication is "manual", for demonstration purposes, rather than using a third-party solution.

- To test the API using `graphiql`, temporarily comment out the authorization lines in `cowsay_api/src/graphql/resolvers.js`, like this:

```js
getCows: (args, req) => {
  // if (!req.isAuthorized) throw newError(403, "Forbidden");
  return cows;
};
```

## Other Stuff

### Rebuilding Docker images

If you add npm packages to the app or api, these changes will cause the apps running in their containers to fail, because they are relying on an old verions of `package.json`.

To get them running again, do the following:

1. Optional - run Docker with the prune option:

```console
docker system prune
```

2. Run Docker Compose with the build option:

```console
docker-compose up --build
```

### Rebuild the database

1. `CTRL-C` in the terminal where your ran `docker-run-compose` to stop MongoDB
2. Delete the `mongodb` directory inside the `mongodb_data` folder without deleting the parent directory. Use `sudo rm -rf mongodb_data/mongodb/`, as permissions on folder aren't yours.
3. Change the `docker-compose.yml` settings as desired.
4. Run `docker-compose up`

## Things learned and/or to be done differently

- Clean up unfinished async calls in React [useEffect](https://reactjs.org/docs/hooks-effect.html) hooks, like [this](https://binarapps.com/blog/clean-up-request-in-useeffect-react-hook/).
- Debouncing form value validation is interesting, but probably not worth the complexity. I prefer [Formik](https://jaredpalmer.com/formik/) and [onBlur](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event) with [Yup](https://github.com/jquense/yup).
- While homespun authentication is good to understand, I think others have already built better wheels. I like [Auth0](https://auth0.com/) and would implement a more sophisticated approach with both [Access](https://auth0.com/docs/tokens/access-tokens) and [Refresh](https://auth0.com/docs/tokens/refresh-token/current) tokens.
- GraphQl error handling with `express-graphql` is not fun, I'll probably use [Apollo](https://www.apollographql.com/) on future projects, as [I've read](https://blog.apollographql.com/full-stack-error-handling-with-graphql-apollo-5c12da407210) that it deals with this better.
- It's nigh impossible to prevent password managers, like 1Password, from grabbing at your form fields.
- Using the [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) React hook for state flow is doable, but I'm thinking that going full Redux would be better when working with lots of actions and/or more complex apps.

```

```
