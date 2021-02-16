# Database changes
Updating the DB structure is currently a little messy. Steps below.

- First, use knex cli to generate your migration file. It should look something like this: `knex migrate:make description_of_change`. This will auto generate a timestamped knex migration file.
- Migration files are useful for local development or boostrapping a new DB
- If necessary, create a matching seed file using `knex seed:make XX_description_of_change`. Sometimes it's fine to ignore this step or just go back and modify an existing seed file.
- Test locally. Wipe your local DB, run `make migrate` then `make seed`. Start up a local server and test your changes locally until satisfied.
- Once everything works as expected, test on staging by connecting to the DO managed DB. You can do that using psql, and then entering the connection string that DO provides. Use the correct user with the correct DB (dev with dev, prod with prod). Alter table to match your local copy. Test initially on the dev DB. Staging is a bit messy, you might have to custom docker compose a bit to get your deployed image to use the dev DB and not prod.
- Once that is verified, repeat process for prod. Your DB structural changes are now live. It might require a hard refresh for the changes to appear.
