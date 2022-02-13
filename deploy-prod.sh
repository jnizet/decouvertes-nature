#!/bin/bash

set -e

yarn
yarn build
firebase deploy --except functions
