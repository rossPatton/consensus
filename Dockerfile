# @TODO reset USER to node for safety, but leaving rn since this was the state when it worked for the first time
# get node distro - should be consistent across environments
FROM node:12.3.0-alpine

USER root
ENV NODE_ENV=production
ARG MAXMIND_LICENSE_KEY=1JH4fyzfbYAJPRze

# copy package.json etc FIRST. any changes here invalidate cache for rest of file
# see https://docs.semaphoreci.com/article/81-docker-layer-caching
COPY package.json package-lock.json app/

# create home dir, where the app will be run
WORKDIR /app

# install our dependencies, for now we want to install ALL deps, including dev ones
# put before COPY, any changes in the cwd will invalidate the cache for this layer
RUN npm ci --arch=x64 --platform=linux --progress=false

# below this point we don't need to worry about the cache
# copy everything not in .dockerignore to /app
COPY . $WORKDIR

# curl is very useful when debugging, uncomment to include in container
# RUN apk add curl=7.64.0-r3 --no-cache

# make sure we're not running root
# USER node

# make sure node is owned by non-root user, otherwise node app will exit with 1
# COPY --chown=node:node . .

# increase max # of threads available to our nodejs process
ENV UV_THREADPOOL_SIZE=64

# expose ports to outside world
EXPOSE 3001

# run site in container
CMD ["npm", "run", "prod"]
