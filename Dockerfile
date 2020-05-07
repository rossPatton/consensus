# get node distro - should be consistent across environments
FROM node:12.3.0-alpine

USER root

# copy package.json etc FIRST. any changes here invalidate cache for rest of file
# see https://docs.semaphoreci.com/article/81-docker-layer-caching
COPY package.json package-lock.json app/

# create home dir, where the app will be run
WORKDIR /app

# install our dependencies, for now we want to install ALL deps, including dev ones
# put before COPY, any changes in the cwd will invalidate the cache for this layer
ARG MAXMIND_LICENSE_KEY=1JH4fyzfbYAJPRze
RUN npm ci --arch=x64 --platform=linux --progress=false

# below this point we don't need to worry about the cache
# copy everything not in .dockerignore to /app
COPY . $WORKDIR

# Alpine Linux is a bare-bones distro, but curl is very useful when debugging so add it
RUN apk add curl=7.64.0-r3 --no-cache
# RUN apk add --no-cache redis
# RUN apk add --no-cache screen

# make sure we're not running root
USER node

# make sure node is owned by non-root user, otherwise node app will exit with 1
COPY --chown=node:node . .

# increase max # of threads available to our nodejs process
ENV UV_THREADPOOL_SIZE=64

# expose ports to outside world
EXPOSE 3001
EXPOSE 6379

# run the damn thing
ENV NODE_ENV=production
CMD ["npm", "run", "prod"]
