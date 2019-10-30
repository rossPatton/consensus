#!/bin/sh
set -e

# echo never | tee /sys/kernel/mm/transparent_hugepage/enabled
# echo never | tee /sys/kernel/mm/transparent_hugepage/defrag

if [ $NODE_ENV = "production" ] ; then
  npm run localProd
else
  npm start
fi
