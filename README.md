# Consensus
Consens.us is currently a free meetings platform for the left. The hope is to grow into a centralized meetup/loomio/whatever replacement, a central home for your union, working group, collective, cooperative, or whatever.

It is developed by @rossPatton in his spare time for free. I would very much like to make this a viable job for myself, so that I can work on this full time and potentially grow into a cooperative. To that end I'm interested in any funding help or support you can give!

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

Steps for deployment:
 - `make build`: Builds docker image
 - `docker push consensusdocker/repo`: Pushes docker image to remote repo
 - `ssh consensus@ip`: ssh into DO droplet where deployment will happen
 - `docker pull consensusdocker/repo`: pull down latest docker deployment into droplet
 - `sudo docker-compose -f docker-compose.yml up --remove-orphans --force-recreate -d`: Restart docker container with latest docker image

Steps for setting up new DO droplet:
 - Setup UFW to limit ssh to verified accounts only. See https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-18-04 or https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04
 - Setup nginx as a reverse proxy. See https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04#step-5-%E2%80%93-setting-up-server-blocks-(recommended) as a starting point. Our nginx prof config is located in nginx/prod.conf
 - Setup certbot if using with a domain name/floating ip. When the floating ip is pointed at the server, we want it to use the domain name, not the DO ip.

