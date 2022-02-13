#!/bin/bash

set -e

pushd functions && yarn && popd
firebase deploy --only functions
