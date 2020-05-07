# install dependencies. npm install, basically
# useful for local development to decouple build/run steps
install:
	docker-compose -f docker-compose.install.yml run --rm install; npm audit fix;

# runs debug mode locally
debug:
	docker-compose -f docker-compose.yml -f docker-compose.debug.yml up --remove-orphans

# runs development mode locally
dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --remove-orphans

# runs production mode locally
prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --remove-orphans

# build site for prod, and prepares an image for deployment
build:
	docker-compose -f docker-compose.yml -f docker-compose.build.yml build --no-cache --parallel

# setup external nginx network
nginx:
	docker-compose -f ./nginx/docker-compose.yml up --remove-orphans

# stops all active containers (as defined by docker-compose)
reset:
	docker-compose down --remove-orphans

# if installing on new machine, you need to create the shared networks and volumes first
setup:
	docker network inspect nginx-proxy >/dev/null || docker network create nginx-proxy;
	docker network inspect db_data >/dev/null || docker volume create db_data;
	docker network inspect node_modules >/dev/null || docker volume create node_modules;

# just an alias for make dev
start:
	docker-compose up --remove-orphans
