# get node distro - should be consistent across environments
FROM node:12.3.0-alpine

# allow access to node_modules and app dir
RUN mkdir -p /app/node_modules && chown -R node:node /app

# create home dir, where the app will be run
WORKDIR /app

# copy everything not in .dockerignore to /app
COPY . $WORKDIR

# install our dependencies, for now we want to install ALL deps, including dev ones
RUN npm install

# make sure we're not running root
USER node

# make sure node is owned by non-root user
COPY --chown=node:node . .

# expose ports to outside world
EXPOSE 3000 3001

# make sure we're running in production mode, just in case
ENV NODE_ENV production

# make sure we're using the production DB, just in case
# TODO change to production once we actually have some real data there
ENV DB development

# // you are in the middle of getting docker to build and run the site in prod mode locally
# // ports and sudo is a problem, so you need to roll back some of the recent server changes
# // then figure out how to push this up to digital ocean and run it there
# // ideally behind nginx and a load balancer, etc

# run the damn thing
CMD [ "npm", "run", "localProd" ]
