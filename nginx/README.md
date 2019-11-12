# LOCALHOST NGINX CONFIG
This folder basically sets up an nginx docker network as a reverse proxy for local development

# KNOWN ISSUES
proxy_pass needs to be manually updated on creation to use https instead of http

nano /etc/nginx/conf.d/default.conf
change http to https
nginx -s reload

^ ideally we use a custom nginx conf to override this value without having to manually update every time
