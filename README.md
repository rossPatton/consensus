# Consensus
Consens.us is currently a free meetings platform for the left. The hope is to grow into a centralized meetup/loomio/whatever replacement, a central home for your union, working group, collective, cooperative, or whatever.

I work on this in my spare time for free. I'd very much like to at least break even on hosting though, so I'm interested in any funding help or support you can give!

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

# Database changes
See server/db/README.md

# Deployment
Currently, deployment happens very manually on our remote Digital Ocean host. The host currently contains slightly modified copies of our local docker-compose setup. We pull down the latest build from our dockerhub repo, and then we run that using docker-compose.

We ostensibly use blue/green deployment, but due to a cert issue, green is currently prod and blue is staging. We could set it up to alternate, but it appears to work fine as is. There is the potential for site downtime during deployment without alternating, but caching usually covers it.

Steps for deployment:
  - Run `make build` to build docker image and push it to our docker repo
  - Run the deploy script for the server you want to deploy to (either `make deployBlue` or `make deployGreen`)
  - Keep an eye on the script, you will need to enter the appropriate password for the DO server
  - Deploy is done! Assuming you put in the right password, the script should pull down the latest image from our docker repo and restart the container

@TODO - this really should just be a makefile script
Steps for setting up new DO droplet:
 - Setup UFW to limit ssh to verified accounts only. See https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-18-04 or https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04
 - Setup nginx as a reverse proxy. See https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04#step-5-%E2%80%93-setting-up-server-blocks-(recommended) as a starting point. Our nginx prof config is located in nginx/prod.conf
 - Setup certbot if using with a domain name/floating ip. When the floating ip is pointed at the server, we want it to use the domain name, not the DO ip.

