#!/bin/bash

yarn

cd shared
yarn
yarn build

cd ../server
yarn
yarn start
