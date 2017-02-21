#!/bin/bash

if [[ "$TRAVIS_BRANCH" == "dev" ]]; then
  echo "Deploying for development"
  export PLUFF_FTP_DIST=$PLUFF_FTP_DIST_DEV
  npm run deploy-auto
fi

if [[ "$TRAVIS_BRANCH" == "master" ]]; then
  echo "Deploying for production"
  export PLUFF_FTP_DIST=$PLUFF_FTP_DIST_PROD
  npm run deploy-auto
fi

