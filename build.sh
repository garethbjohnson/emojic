#!/bin/bash

yarn

cd shared
yarn
yarn build

cd ../client
yarn
REACT_APP_HTTP_API_URL=/api REACT_APP_WEB_SOCKET_API_URL= yarn build

cd ../server
yarn
yarn build

cd ..
rm -rf build
mkdir build

cp -r node_modules/ build/node_modules
rm -rf build/node_modules/emojic-client
rm -rf build/node_modules/emojic-server

cp -r server/dist/* build

rm -rf build/client
cp -r client/build build/client
