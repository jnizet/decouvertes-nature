#!/bin/bash

# Starts the emulator with a single admin user "jnizet@gmail.com / password
# and a single example activity.
# Note: if the data need to change, then  use the same command as below with the additional option
# --export-on-exit=emulator-data
# then edit the data in the emulator UI (http://localhost:4000), or through the application
# then stop the emulator. The emulator-data folder will contain the new data.

set -e

# build the functions
pushd functions
yarn
yarn build
popd
# then start the emulators
yarn firebase emulators:start --import=emulator-data
