# build app. uses env vars defined in .env
install:
	docker-compose -f docker-compose.build.yml run --rm install

# runs dev app. uses env vars defined in .env
dev:
	docker-compose up

# runs dev app. uses env vars defined in .env
prod:
	docker-compose -f docker-compose.prod.yml up --rm --build
