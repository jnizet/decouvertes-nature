#!/bin/bash

set -e

yarn
yarn build
yarn firebase deploy --except functions
