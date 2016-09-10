#!/usr/bin/env bash

concurrently --kill-others "webpack-dev-server --inline --progress --port 8080" "electron . --debug"
