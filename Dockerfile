# get node distro - should be consistent across environments
FROM node:12.3.0-alpine
# make sure we're running in production mode, just in case
ENV NODE_ENV production
# make sure we're using the production DB, just in case
# TODO change to production once we actually have some real data there
ENV DB development

# allow access to node_modules and app dir
RUN mkdir -p /app/node_modules && chown -R node:node /app
# create home dir, where the app will be run
WORKDIR /app
# copy everything not in .dockerignore to /app
COPY . $WORKDIR
# make sure we're not running root
USER node
# make sure node is owned by non-root user
COPY --chown=node:node . .
# install our dependencies
RUN npm install --prod
# exposes port 443, or whatever port we decide to run the prod site on
EXPOSE 80 443
# run the damn thing
CMD [ "npm run prod" ]
