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

# just an alias that runs dev mode locally
start:
	docker-compose up --remove-orphans
