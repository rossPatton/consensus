#!/bin/sh
set -e

npm run build

if [ $NODE_ENV = "production" ] ; then
  npm run localProd
else
  npm start
fi
