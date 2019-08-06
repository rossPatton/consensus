# server/
This folder contains all the server-side logic. The top level folder contains the server side config file (for easy access to env variables, other things), the server bootstrap file, and the server render code for initializing react.

## api/
All the api routes get handled here, using the db connection defined in db/

## db/
The connection to the postgres db gets established here. Also contains our knex configuration and migrations/seeds for working with faked data locally.

## middleware/
All Koa middleware goes here.
