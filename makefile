# install dependencies. npm install, basically
# useful for local development to decouple build/run steps
install:
	docker-compose -f docker-compose.install.yml run --rm install

# runs debug mode locally
debug:
	docker-compose -f docker-compose.debug.yml up --remove-orphans

# runs development mode locally
dev:
	docker-compose -f docker-compose.yml up --remove-orphans

# runs production mode locally
prod:
	docker-compose -f docker-compose.prod.yml up --remove-orphans

# build site for prod, and prepares an image for deployment
build:
	docker-compose -f docker-compose.prod.yml build --no-cache --parallel

# stops all active containers (as defined by docker-compose)
reset:
	docker-compose down

# if installing on new machine, you need to create the shared networks and volumes first
setup:
	docker network inspect nginx-proxy >/dev/null || docker network create nginx-proxy;
		docker volume create db_data;
		docker volume create node_modules

# just an alias for make dev
start:
	docker-compose up --remove-orphans
