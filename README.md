# Consensus
-- TODO fill me out

# First Time
Run 3 commands in order to get the dev server running:
- npm i
- make setup
- make install (if node_modules volume isn't populated)

Init the nginx proxy so that you can access consensus.local locally
This network should be run in detached mode and will automatically restart. Once up, you never need to worry about it again, unless you prune the container.
- cd /nginx
- docker-compose up -d

Then run the server locally:
- make dev (or make prod for production mode)

You're good to go!

# Deployment
Currently, deployment happens very manually on our remote Digital Ocean host. The host currently contains slightly modified copies of our local docker-compose setup. We pull down the latest build from our dockerhub repo, and then we run that using docker-compose.

Locally, just
