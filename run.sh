#!/bin/sh

yarn build
rm -r server/public
cp -r build server/public
cd server
yarn dbclear && yarn dbinit
yarn start
