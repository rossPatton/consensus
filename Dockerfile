# get node distro - should be consistent across environments
FROM node:12.3.0-alpine

# TODO use secrets or something. also, change this before going live
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

# make sure we're not running root
USER node

# make sure node is owned by non-root user, otherwise node app will exit with 1
COPY --chown=node:node . .

# expose ports to outside world
EXPOSE 3001

CMD ["npm", "run", "prod"]
