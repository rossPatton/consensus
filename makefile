include .env
export

# install dependencies. npm install, basically
# useful for local development to decouple build/run steps
install:
	docker-compose -f docker-compose.install.yml run --rm install; npm audit fix;

# runs development mode locally
dev:
	npm run build_dev;
	docker-compose -f docker-compose.dev.yml up --remove-orphans

# runs production mode locally
prod:
	npm run build;
	docker-compose -f docker-compose.prod.yml up --remove-orphans

# build site for prod, prepares an image for deployment
build:
	npm run build;
	docker-compose -f docker-compose.build.yml build --no-cache --parallel;
	docker push consensusdocker/prod;

# setup external nginx network
nginxProxy:
	docker-compose -f ./nginx/docker-compose.yml up -d --remove-orphans

# stops all active containers (as defined by docker-compose)
reset:
	docker-compose -f docker-compose.dev.yml down --remove-orphans

# if installing on new machine, you need to create the shared networks and volumes first
setup:
	docker network inspect nginx-proxy >/dev/null || docker network create nginx-proxy;
	docker network inspect db_data >/dev/null || docker volume create db_data;
	docker network inspect node_modules >/dev/null || docker volume create node_modules;

# just an alias for make dev
start:
	docker-compose up --remove-orphans

# we use blue/green deployment, so we alternate between blue and green as prod
# so check DO before deploying to either server, make sure you have the right one
# you will need to manually enter the password for each server on deploy
# run make build first
deployBlue:
	ssh -t consensus@${DO_BLUE} "sudo docker pull consensusdocker/prod && sudo docker-compose -f docker-compose.yml up --remove-orphans --force-recreate -d";

deployGreen:
	ssh -t consensus@${DO_GREEN} "sudo docker pull consensusdocker/prod && sudo docker-compose -f docker-compose.yml up --remove-orphans --force-recreate -d";

# migrations that alter or extend existing tables won't work unless DB is bootstrapped
# bootstrap === base table structure necessary to allow further changes
# extremely verbose, but knex-migrate doesn't support typescript, and bare knex
# doesn't support any way to run migrations up to a certain point
# but this is a one and done thing, will rarely ever be needed
bootstrap:
	DB_HOST=${DB_MIGRATION_HOST} DB_PORT=${DB_LOCAL_PORT} DB_PW=${DB_LOCAL_PW} DB_USER=${DB_LOCAL_USER} DB=${DB_LOCAL} node -r esm ./node_modules/.bin/knex migrate:up 00_categories.ts;
	DB_HOST=${DB_MIGRATION_HOST} DB_PORT=${DB_LOCAL_PORT} DB_PW=${DB_LOCAL_PW} DB_USER=${DB_LOCAL_USER} DB=${DB_LOCAL} node -r esm ./node_modules/.bin/knex migrate:up 01_countries.ts;
	DB_HOST=${DB_MIGRATION_HOST} DB_PORT=${DB_LOCAL_PORT} DB_PW=${DB_LOCAL_PW} DB_USER=${DB_LOCAL_USER} DB=${DB_LOCAL} node -r esm ./node_modules/.bin/knex migrate:up 02_regions.ts;
	DB_HOST=${DB_MIGRATION_HOST} DB_PORT=${DB_LOCAL_PORT} DB_PW=${DB_LOCAL_PW} DB_USER=${DB_LOCAL_USER} DB=${DB_LOCAL} node -r esm ./node_modules/.bin/knex migrate:up 03_cities.ts;
	DB_HOST=${DB_MIGRATION_HOST} DB_PORT=${DB_LOCAL_PORT} DB_PW=${DB_LOCAL_PW} DB_USER=${DB_LOCAL_USER} DB=${DB_LOCAL} node -r esm ./node_modules/.bin/knex migrate:up 04_postcodes.ts;
	DB_HOST=${DB_MIGRATION_HOST} DB_PORT=${DB_LOCAL_PORT} DB_PW=${DB_LOCAL_PW} DB_USER=${DB_LOCAL_USER} DB=${DB_LOCAL} node -r esm ./node_modules/.bin/knex migrate:up 05_users.ts;
	DB_HOST=${DB_MIGRATION_HOST} DB_PORT=${DB_LOCAL_PORT} DB_PW=${DB_LOCAL_PW} DB_USER=${DB_LOCAL_USER} DB=${DB_LOCAL} node -r esm ./node_modules/.bin/knex migrate:up 06_groups.ts;
	DB_HOST=${DB_MIGRATION_HOST} DB_PORT=${DB_LOCAL_PORT} DB_PW=${DB_LOCAL_PW} DB_USER=${DB_LOCAL_USER} DB=${DB_LOCAL} node -r esm ./node_modules/.bin/knex migrate:up 07_meetings.ts;
	DB_HOST=${DB_MIGRATION_HOST} DB_PORT=${DB_LOCAL_PORT} DB_PW=${DB_LOCAL_PW} DB_USER=${DB_LOCAL_USER} DB=${DB_LOCAL} node -r esm ./node_modules/.bin/knex migrate:up 08_users_meetings.ts;
	DB_HOST=${DB_MIGRATION_HOST} DB_PORT=${DB_LOCAL_PORT} DB_PW=${DB_LOCAL_PW} DB_USER=${DB_LOCAL_USER} DB=${DB_LOCAL} node -r esm ./node_modules/.bin/knex migrate:up 09_users_roles.ts;
	DB_HOST=${DB_MIGRATION_HOST} DB_PORT=${DB_LOCAL_PORT} DB_PW=${DB_LOCAL_PW} DB_USER=${DB_LOCAL_USER} DB=${DB_LOCAL} node -r esm ./node_modules/.bin/knex migrate:up 10_users_invites.ts;

# runs latest migrations
migrate:
	DB_HOST=${DB_MIGRATION_HOST} DB_PORT=${DB_LOCAL_PORT} DB_PW=${DB_LOCAL_PW} DB_USER=${DB_LOCAL_USER} DB=${DB_LOCAL} node -r esm ./node_modules/.bin/knex migrate:latest;
seed:
	DB_HOST=${DB_MIGRATION_HOST} DB_PORT=${DB_LOCAL_PORT} DB_PW=${DB_LOCAL_PW} DB_USER=${DB_LOCAL_USER} DB=${DB_LOCAL} node -r esm ./node_modules/.bin/knex seed:run;

# for connecting as a public user, vs the app connecting via private network
db_prod:
	psql ${DB_PROD_PUBLIC_CONNECTION_STRING};
db_dev:
	psql ${DB_DEV_PUBLIC_CONNECTION_STRING};
