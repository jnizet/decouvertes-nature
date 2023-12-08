#!/bin/bash

set -e

pushd functions && yarn && popd
yarn firebase deploy --only functions
