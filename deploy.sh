#!/usr/bin/env bash

set -e

npm run build
tar -czvf /tmp/build.tar.gz dist/
scp /tmp/build.tar.gz rebellion:/tmp/
ssh -t rebellion "
  cd /tmp/
  tar -xzvf build.tar.gz
  sudo -u nginx cp -r dist/* /srv/physics/
  rm -rf dist/
  rm build.tar.gz
"

echo "Finished successfully"
